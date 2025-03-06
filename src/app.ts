import * as React from 'react';
import * as ReactNativeScript from 'react-nativescript';
import { MainStack } from './components/MainStack';
import { Application } from '@nativescript/core';
import { manuallyStoreTokens, getValidAccessToken } from './utils/auth'; // Import the new auth functions

// Controls react-nativescript log verbosity.
Object.defineProperty(global, '__DEV__', { value: false });

const App = () => {
    const [youtubeToken, setYoutubeToken] = React.useState<string | null>(null);

    // Handle deep linking to extract the access token (if needed)
    React.useEffect(() => {
        const onResume = (args: any) => {
            const url = args.android ? args.android.getIntent().getDataString() : null;
            if (url && url.startsWith('https://zp1v56uxy8rdx5ypatb0ockcb9tr6a')) {
                const accessToken = "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"; // Replace with actual token extraction logic
                console.log('Access Token:', accessToken);
                setYoutubeToken(accessToken); // Set the youtubeToken state (if still needed)
            }
        };

        Application.on(Application.resumeEvent, onResume);

        // Cleanup the event listener on component unmount
        return () => {
            Application.off(Application.resumeEvent, onResume);
        };
    }, []);

    // Initialize the tokens (call this once to store your tokens)
    React.useEffect(() => {
        const initializeTokens = async () => {
            try {
                // Replace these with your actual tokens
                const accessToken = "ya29.a0AXeO80TQrU36-tg6Hme7DHi2lmc32_V_By0Kwl1PXfrHpzQSK1OABALL_IoPj2w-Ke61kIVbvhH31O6TXahp-KriIF3Fe53h9OlKQHmusCTRuR7b2lSuYXd6o4OfH4YBA-v2rBkRuf0iaNq5-W0E0v9Cs5-xA5HeUj7jkxJbaCgYKAWQSARMSFQHGX2Mif6KL9Dd3kHEfkuDwPMsB_A0175";
                const refreshToken = "1//04C0bZYTMsqPxCgYIARAAGAQSNwF-L9IrId4qru0G2vgb3oWOXwFcsIJCsQNViobqqmuX8ul3JTsF7wM6sAHjspAp2fAFAuavibY";

                // Store the tokens using the new auth.ts function
                await manuallyStoreTokens(accessToken, refreshToken);
                console.log('Tokens initialized successfully!');

                // Fetch a valid access token (optional, for testing)
                const validToken = await getValidAccessToken();
                setYoutubeToken(validToken); // Set the youtubeToken state (if still needed)
            } catch (error) {
                console.error('Failed to initialize tokens:', error);
            }
        };

        initializeTokens();
    }, []);

    return React.createElement(MainStack, { youtubeToken: youtubeToken });
};

// Start the app
ReactNativeScript.start(React.createElement(App, {}, null));
