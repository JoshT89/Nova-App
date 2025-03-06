import * as React from 'react';
import * as ReactNativeScript from 'react-nativescript';
import { MainStack } from './components/MainStack';
import { Application } from '@nativescript/core';
import { manuallyStoreTokens, getValidAccessToken, initiateOAuthFlow } from './utils/auth';
import { knownFolders, File } from '@nativescript/core/file-system';

// Controls react-nativescript log verbosity.
Object.defineProperty(global, '__DEV__', { value: false });

// Helper function to load environment variables (simplified)
async function getEnvVariable(key: string): Promise<string> {
    try {
        const folder = knownFolders.currentApp();
        const envFile = folder.getFile('.env');
        const content = await envFile.readText();
        
        const match = content.match(new RegExp(`${key}=(.*)`, 'm'));
        if (match && match[1]) {
            // Remove quotes if present
            let value = match[1];
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.substring(1, value.length - 1);
            }
            return value;
        }
        return '';
    } catch (error) {
        console.error(`Error loading ${key} from .env file:`, error);
        return '';
    }
}

const App = () => {
    const [youtubeToken, setYoutubeToken] = React.useState<string | null>(null);
    const [isInitializing, setIsInitializing] = React.useState<boolean>(true);

    // Handle deep linking for OAuth callback
    React.useEffect(() => {
        const onResume = async (args: any) => {
            const url = args.android ? args.android.getIntent().getDataString() : null;
            
            // Get the redirect URI from environment
            const redirectUri = await getEnvVariable('YOUTUBE_REDIRECT_URI');
            
            if (url && redirectUri && url.startsWith(redirectUri)) {
                // Extract token from URL parameters 
                const urlParams = new URLSearchParams(url.split('?')[1]);
                const accessToken = urlParams.get('access_token');
                const refreshToken = urlParams.get('refresh_token');
                
                if (accessToken && refreshToken) {
                    console.log('OAuth tokens received from callback');
                    await manuallyStoreTokens(accessToken, refreshToken);
                    setYoutubeToken(accessToken);
                }
            }
        };

        Application.on(Application.resumeEvent, onResume);

        // Cleanup the event listener on component unmount
        return () => {
            Application.off(Application.resumeEvent, onResume);
        };
    }, []);

    // Initialize authentication state
    React.useEffect(() => {
        const initializeTokens = async () => {
            try {
                setIsInitializing(true);
                
                // Try to get a valid token if already stored
                const validToken = await getValidAccessToken().catch(() => null);
                
                if (validToken) {
                    console.log('Using existing valid token');
                    setYoutubeToken(validToken);
                } else {
                    console.log('No valid token found - user needs to authenticate');
                    // In a real app, you would trigger the OAuth flow here
                    // or prompt the user to authenticate
                }
            } catch (error) {
                console.error('Failed to initialize authentication:', error);
            } finally {
                setIsInitializing(false);
            }
        };

        initializeTokens();
    }, []);

    if (isInitializing) {
        // You could show a loading screen here
        return null;
    }

    return React.createElement(MainStack, { youtubeToken: youtubeToken });
};

// Start the app
ReactNativeScript.start(React.createElement(App, {}, null));
