// src/utils/auth.ts

import { ApplicationSettings } from '@nativescript/core';

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
const CLIENT_ID = '347436410930-0vefq82j0u978gca10a86em0a27gd2cm.apps.googleusercontent.com'; // Replace with your Google OAuth client ID
const CLIENT_SECRET = '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'; // Replace with your Google OAuth client secret
const REFRESH_TOKEN_URL = 'https://oauth2.googleapis.com/token';

/**
 * Manually store the access and refresh tokens for testing or initial setup.
 * Call this function once to store the tokens.
 */
export async function manuallyStoreTokens(accessToken: string, refreshToken: string): Promise<void> {
    const tokens: TokenData = {
        accessToken: "ya29.a0AeXRPp5h5xXrgIMKdgyO2CCofqUkKASSY_j1bdvWNB_A4MbimruOmBok_BB7gU4dIS84jABkWiK-fUaGM38wSURiL0-0NXZVA1v5zgeaf3m_zTcHSGwGxWQJv0qnSR7GQdIO541VJU47uQJawzuRiDIbCGCjA3pJN8nPk8a2aCgYKARUSARMSFQHGX2MibrPTr8Hsli3HwK9xc9daWA0175", // Use the access token you obtained
        refreshToken: "1//04_ujK6I2GeSaCgYIARAAGAQSNwF-L9IrZ08pmNiIeTr8L4KyBqOoZ15X_zj_7LuCjtpPNyWS0lUtmDS-3t6QmNJ3iQvquI-bxfc", // Use the refresh token you obtained
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
        const response = await fetch(REFRESH_TOKEN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
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
            refreshToken: "refeshToken", // Keep the existing refresh token
            expiresAt: Date.now() + (data.expires_in * 1000), // Set new expiration time
        };

        await storeTokens(tokens);
        return tokens;
    } catch (error) {
        console.error('Error refreshing token:', error);
        // Clear stored tokens if refresh fails
        await clearTokens();
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
        const newTokens = await refreshAccessToken(tokens.refreshToken);
        return newTokens.accessToken;
    }

    return tokens.accessToken;
}