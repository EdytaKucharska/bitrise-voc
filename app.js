// This example shows basic use of modals.
// It uses slash commands, views.open, and views.update
// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
});

// Listen for a slash command invocation
app.command('/voc', async ({ ack, body, context }) => {
    // Acknowledge the command request
    ack();

    try {
        const result = await app.client.views.open({
            token: context.botToken,
            // Pass a valid trigger_id within 3 seconds of receiving it
            trigger_id: body.trigger_id,
            // View payload
            view: {
                "type": "modal",
                "callback_id": "main_view",
                "title": {
                    "type": "plain_text",
                    "text": "My App",
                    "emoji": true
                },
                "submit": {
                    "type": "plain_text",
                    "text": "Submit",
                    "emoji": true
                },
                "close": {
                    "type": "plain_text",
                    "text": "Cancel",
                    "emoji": true
                },
                "blocks": [
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "Hello, this is Voice of Customer app which allows you to raise the feature request or provide customer feedback on clients behalf. All provided  information will be submitted to Productboard which is our source of truth for this type of requirements. \n\n *Please complete below questionnaire:*"
                        }
                    },
                    {
                        "type": "divider"
                    },
                    {
                        "type": "input",
                        "element": {
                            "type": "static_select",
                            "placeholder": {
                                "type": "plain_text",
                                "text": "Select an item",
                                "emoji": true
                            },
                            "options": [
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "*this is plain_text text*",
                                        "emoji": true
                                    },
                                    "value": "value-0"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "Feature request",
                                        "emoji": true
                                    },
                                    "value": "value-1"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "Customer Feedback",
                                        "emoji": true
                                    },
                                    "value": "value-2"
                                }
                            ],
                            "action_id": "static_select-action"
                        },
                        "label": {
                            "type": "plain_text",
                            "text": "Request Type:",
                            "emoji": true
                        }
                    },
                    {
                        "type": "input",
                        "element": {
                            "type": "plain_text_input",
                            "action_id": "plain_text_input-action"
                        },
                        "label": {
                            "type": "plain_text",
                            "text": "Title:",
                            "emoji": true
                        }
                    },
                    {
                        "type": "input",
                        "element": {
                            "type": "plain_text_input",
                            "multiline": true,
                            "action_id": "plain_text_input-action"
                        },
                        "label": {
                            "type": "plain_text",
                            "text": "Description:",
                            "emoji": true
                        }
                    },
                    {
                        "type": "input",
                        "element": {
                            "type": "static_select",
                            "placeholder": {
                                "type": "plain_text",
                                "text": "Select an item",
                                "emoji": true
                            },
                            "options": [
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "Opportunity/Deal Breaker",
                                        "emoji": true
                                    },
                                    "value": "value-0"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "Churn risk",
                                        "emoji": true
                                    },
                                    "value": "value-1"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "Contractual Obligation",
                                        "emoji": true
                                    },
                                    "value": "value-2"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "Regular",
                                        "emoji": true
                                    },
                                    "value": "value-3"
                                }
                            ],
                            "action_id": "static_select-action"
                        },
                        "label": {
                            "type": "plain_text",
                            "text": "Impact:",
                            "emoji": true
                        }
                    },
                    {
                        "type": "input",
                        "element": {
                            "type": "plain_text_input",
                            "multiline": true,
                            "action_id": "plain_text_input-action"
                        },
                        "label": {
                            "type": "plain_text",
                            "text": "Cost of not doing:",
                            "emoji": true
                        }
                    },
                    {
                        "type": "input",
                        "element": {
                            "type": "plain_text_input",
                            "action_id": "plain_text_input-action"
                        },
                        "label": {
                            "type": "plain_text",
                            "text": "Contact person email address:",
                            "emoji": true
                        }
                    }
                ]
            }
        });
        console.log(result);
    }
    catch (error) {
        console.error(error);
    }

});

// Listen for a button invocation with action_id `button_abc` (assume it's inside of a modal)
// You must set up a Request URL under Interactive Components on your app configuration page
// app.action('button_abc', async ({ ack, body, context }) => {
//     // Acknowledge the button request
//     ack();

//     try {
//         const result = await app.client.views.update({
//             token: context.botToken,
//             view_id: body.view.id,
//             // View payload with updated blocks
//             view: {
//                 type: 'modal',
//                 // View identifier
//                 callback_id: 'view_1',
//                 title: {
//                     type: 'plain_text',
//                     text: 'Updated modal'
//                 },
//                 blocks: [
//                     {
//                         type: 'section',
//                         text: {
//                             type: 'plain_text',
//                             text: 'You updated the modal!'
//                         }
//                     },
//                     {
//                         type: 'image',
//                         image_url: 'https://media.giphy.com/media/SVZGEcYt7brkFUyU90/giphy.gif',
//                         alt_text: 'Yay! The modal was updated'
//                     }
//                 ]
//             }
//         });
//         console.log(result);
//     }
//     catch (error) {
//         console.error(error);
//     }
// });


(async () => {
    // Start your app
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');
})();

// Handle a view_submission request
app.view('main_view', async ({ ack, body, view, client, logger }) => {
    // Acknowledge the view_submission request
    console.info('Received modal submit');
    ack();

    // Do whatever you want with the input data - here we're saving it to a DB then sending the user a verifcation of their submission

    // Assume there's an input block with `block_1` as the block_id and `input_a`
    const val = view['state']['values']['request_type'];
    console.log(val);
    const user = body['user']['id'];
    console.log(user);

    // Message to send user
    let msg = '';

    if (user != null) {
        // DB save was successful
        msg = 'Your submission was successful';
    } else {
        msg = 'There was an error with your submission';
    }

    // Message the user
    try {
        await client.chat.postMessage({
            channel: user,
            text: msg
        });
    }
    catch (error) {
        logger.error(error);
    }

});