// src/utils/auth.ts

import { ApplicationSettings } from '@nativescript/core';
import { knownFolders, File, Folder } from '@nativescript/core/file-system';

/**
 * Represents the structure of OAuth tokens and their expiration
 */
interface TokenData {
    accessToken: string;
    refreshToken: string;
    expiresAt: number; // Timestamp in milliseconds
}

// Constants for authentication
const TOKEN_STORAGE_KEY = 'youtube_tokens';
const REFRESH_TOKEN_URL = 'https://oauth2.googleapis.com/token';

/**
 * Loads environment variables from .env file
 * This is a simple implementation - in production, use a more robust solution
 */
async function loadEnv(): Promise<{[key: string]: string}> {
    try {
        const folder = knownFolders.currentApp();
        const envFile = folder.getFile('.env');
        const content = await envFile.readText();
        
        const env: {[key: string]: string} = {};
        content.split('\n').forEach(line => {
            // Skip comments and empty lines
            if (!line || line.startsWith('#')) return;
            
            const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
            if (match) {
                const key = match[1];
                // Remove quotes if present
                let value = match[2] || '';
                if (value.startsWith('"') && value.endsWith('"')) {
                    value = value.substring(1, value.length - 1);
                }
                env[key] = value;
            }
        });
        
        return env;
    } catch (error) {
        console.error('Error loading .env file:', error);
        return {};
    }
}

// Cache for environment variables
let envCache: {[key: string]: string} | null = null;

/**
 * Gets an environment variable
 */
async function getEnvVariable(key: string): Promise<string> {
    if (!envCache) {
        envCache = await loadEnv();
    }
    return envCache[key] || '';
}

/**
 * Manually store the access and refresh tokens for testing or initial setup.
 * Call this function once to store the tokens.
 */
export async function manuallyStoreTokens(accessToken: string, refreshToken: string): Promise<void> {
    const tokens: TokenData = {
        accessToken,
        refreshToken,
        expiresAt: Date.now() + 3600 * 1000, // Set expiration to 1 hour from now
    };

    await storeTokens(tokens);
    console.log('Tokens stored successfully!');
}

/**
 * Stores OAuth tokens securely in application settings
 */
export async function storeTokens(tokens: TokenData): Promise<void> {
    try {
        ApplicationSettings.setString(TOKEN_STORAGE_KEY, JSON.stringify(tokens));
    } catch (error) {
        console.error('Error storing tokens:', error);
        throw new Error('Failed to store authentication tokens');
    }
}

/**
 * Retrieves stored OAuth tokens from application settings
 */
export async function getStoredTokens(): Promise<TokenData | null> {
    try {
        const tokensString = ApplicationSettings.getString(TOKEN_STORAGE_KEY);
        if (!tokensString) return null;
        return JSON.parse(tokensString);
    } catch (error) {
        console.error('Error retrieving tokens:', error);
        return null;
    }
}

/**
 * Clears stored OAuth tokens
 */
export async function clearTokens(): Promise<void> {
    try {
        ApplicationSettings.remove(TOKEN_STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing tokens:', error);
        throw new Error('Failed to clear authentication tokens');
    }
}

/**
 * Refreshes an expired access token using the refresh token
 */
export async function refreshAccessToken(refreshToken: string): Promise<TokenData> {
    try {
        const clientId = await getEnvVariable('YOUTUBE_CLIENT_ID');
        const clientSecret = await getEnvVariable('YOUTUBE_CLIENT_SECRET');

        if (!clientId || !clientSecret) {
            throw new Error('Missing API credentials. Please check your .env file.');
        }

        const response = await fetch(REFRESH_TOKEN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                refresh_token: refreshToken,
                grant_type: 'refresh_token',
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error_description || 'Failed to refresh token');
        }

        const data = await response.json();
        
        const tokens: TokenData = {
            accessToken: data.access_token,
            refreshToken: refreshToken, // Keep the existing refresh token
            expiresAt: Date.now() + (data.expires_in * 1000), // Set new expiration time
        };

        await storeTokens(tokens);
        return tokens;
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw new Error('Failed to refresh authentication token');
    }
}

/**
 * Gets a valid access token, refreshing if necessary
 */
export async function getValidAccessToken(): Promise<string> {
    const tokens = await getStoredTokens();
    if (!tokens) {
        throw new Error('No authentication tokens found');
    }

    // Check if the current token is expired or will expire soon (5-minute buffer)
    if (tokens.expiresAt - Date.now() < 300000) {
        try {
            const newTokens = await refreshAccessToken(tokens.refreshToken);
            return newTokens.accessToken;
        } catch (error) {
            // If refresh fails, clear tokens and rethrow
            await clearTokens();
            throw error;
        }
    }

    return tokens.accessToken;
}

/**
 * Initiates the OAuth flow for YouTube API
 */
export async function initiateOAuthFlow(): Promise<void> {
    try {
        const clientId = await getEnvVariable('YOUTUBE_CLIENT_ID');
        const redirectUri = await getEnvVariable('YOUTUBE_REDIRECT_URI');
        
        if (!clientId || !redirectUri) {
            throw new Error('Missing OAuth configuration. Please check your .env file.');
        }
        
        // This is just a placeholder for how you might implement OAuth flow
        // The actual implementation depends on your specific requirements and platform
        console.log('OAuth flow would be initiated here.');
    } catch (error) {
        console.error('Failed to initiate OAuth flow:', error);
        throw error;
    }
}
