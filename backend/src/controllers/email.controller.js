const { sendContactEmail } = require('../services/email.service');

async function contactUser(req, res) {
    try {
        const { email, name, description } = req.body;


        if (!email || !name) {
            return res.status(400).json({
                success: false,
                message: "Name and Email are required fields."
            });
        }

        await sendContactEmail(email, name, description);

        return res.status(200).json({
            success: true,
            message: "Email sent successfully!"
        });

    } catch (error) {
        console.error("Controller Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error while processing your request."
        });
    }
}

module.exports = { contactUser };