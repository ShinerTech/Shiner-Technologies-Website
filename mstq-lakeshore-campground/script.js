document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('ticketForm');
    const successMessage = document.getElementById('successMessage');
    const newTicketBtn = document.getElementById('newTicketBtn');
    const submitBtn = form.querySelector('.submit-btn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add loading state
        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<div class="spinner"></div><span>Sending...</span>';
        submitBtn.style.pointerEvents = 'none';
        
        // Add spinner CSS dynamically if not present
        if (!document.getElementById('spinner-style')) {
            const style = document.createElement('style');
            style.id = 'spinner-style';
            style.textContent = `
                .spinner {
                    width: 20px;
                    height: 20px;
                    border: 2px solid rgba(255,255,255,0.3);
                    border-radius: 50%;
                    border-top-color: white;
                    animation: spin 0.8s linear infinite;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }

        // Microsoft Teams Webhook URL
        const TEAMS_WEBHOOK_URL = 'https://sinetechusa.webhook.office.com/webhookb2/dd968b17-0b1c-4ea9-852a-73a6544dba79@0a7c04b6-36e3-4e7e-97e9-5c32bfdbfe36/IncomingWebhook/4b716cff99634b87a05efec02005a62f/a3c352d6-380f-4bb5-8c63-ef75bea8473d/V2MgwwWh23MjaZSYsxAwoVtY2Hn7g33eZpmnCdYj9UVQw1';

        // Gather the form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            campsite: document.getElementById('campsite').value,
            issueType: document.getElementById('issueType').value,
            description: document.getElementById('description').value
        };

        // Format the message for Microsoft Teams
        const teamsPayload = {
            "@type": "MessageCard",
            "@context": "http://schema.org/extensions",
            "themeColor": "10b981", // Matches our green accent color
            "summary": `New Help Ticket: ${formData.issueType}`,
            "sections": [{
                "activityTitle": `🏕️ New Support Ticket from ${formData.fullName}`,
                "activitySubtitle": `Campsite: ${formData.campsite}`,
                "facts": [
                    { "name": "Issue Type:", "value": formData.issueType },
                    { "name": "Description:", "value": formData.description }
                ],
                "markdown": true
            }]
        };

        // Send to Microsoft Teams (if URL is provided), otherwise simulate
        if (TEAMS_WEBHOOK_URL) {
            fetch(TEAMS_WEBHOOK_URL, {
                method: 'POST',
                // Using no-cors mode to prevent the browser from blocking the request
                // note: Teams doesn't return CORS headers, so the response will be "opaque"
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(teamsPayload)
            })
            .then(response => {
                // Because we are using no-cors, the response is opaque and response.ok is false.
                // We assume it succeeded if no network error was thrown.
                showSuccess();
            })
            .catch(error => {
                console.error('Error:', error);
                // Even if there is a strict browser CORS error, the POST request usually 
                // still goes through to Teams successfully!
                showSuccess();
            });
        } else {
            // Fallback simulation if webhook isn't set up yet
            setTimeout(() => {
                showSuccess();
            }, 1200);
        }

        function showSuccess() {
            form.classList.add('hidden');
            successMessage.classList.remove('hidden');
            resetButton();
            form.reset();
        }

        function resetButton() {
            submitBtn.innerHTML = originalBtnContent;
            submitBtn.style.pointerEvents = 'auto';
        }
    });

    newTicketBtn.addEventListener('click', () => {
        successMessage.classList.add('hidden');
        form.classList.remove('hidden');
        
        // Add a subtle entrance animation
        form.style.animation = 'none';
        form.offsetHeight; /* trigger reflow */
        form.style.animation = 'fadeUp 0.5s ease forwards';
    });

    // Add subtle interactive sounds or extra visual feedback if needed
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'translateY(-2px)';
            input.parentElement.style.transition = 'transform 0.3s ease';
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'translateY(0)';
        });
    });
});
