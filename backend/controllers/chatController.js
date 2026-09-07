/* ============================================================
   Controller: Chat
   Handles AI chatbot responses (rule-based with Gemini hook)
   ============================================================ */

// Knowledge base for rule-based responses
const KB = [
    {
        keywords: ['pmjdy', 'jan dhan', 'bank account', 'zero balance'],
        response: '🏦 **PM Jan Dhan Yojana (PMJDY)** provides zero-balance bank accounts to unbanked citizens with a RuPay Debit Card and ₹2 lakh accidental insurance cover. Apply at any bank branch with your Aadhaar card. [Learn More](https://www.pmjdy.gov.in/)'
    },
    {
        keywords: ['kisan', 'farmer', 'agriculture', 'pm-kisan', 'pmkisan'],
        response: '🌾 **PM-KISAN** gives ₹6,000/year directly to small farmers in 3 installments of ₹2,000 each. Farmers with land records can register at [pmkisan.gov.in](https://pmkisan.gov.in/).'
    },
    {
        keywords: ['ayushman', 'health', 'medical', 'hospital', 'insurance', 'pmjay'],
        response: '🏥 **Ayushman Bharat (PMJAY)** provides ₹5 lakh annual health insurance to economically vulnerable families. Check eligibility at [pmjay.gov.in](https://pmjay.gov.in/) using your Aadhaar or Ration Card number.'
    },
    {
        keywords: ['scholarship', 'education', 'study', 'student', 'school', 'college'],
        response: '🎓 Multiple scholarships are available on the **National Scholarship Portal**: Pre-Matric, Post-Matric, and Merit-based scholarships for SC/ST/OBC and minority students. Apply at [scholarships.gov.in](https://scholarships.gov.in/).'
    },
    {
        keywords: ['house', 'home', 'housing', 'awas', 'pmay'],
        response: '🏠 **PM Awas Yojana** offers housing assistance:\n- **Rural (PMAY-G)**: Up to ₹1.30 lakh for pucca house construction\n- **Urban (PMAY-U)**: Interest subsidy up to 6.5% on home loans\nApply at [pmayg.nic.in](https://pmayg.nic.in/) or [pmaymis.gov.in](https://pmaymis.gov.in/).'
    },
    {
        keywords: ['mudra', 'loan', 'business', 'startup', 'entrepreneurship'],
        response: '💼 **MUDRA Loan (PMMY)** offers collateral-free business loans:\n- **Shishu**: Up to ₹50,000\n- **Kishore**: ₹50,001 – ₹5 lakh\n- **Tarun**: ₹5 lakh – ₹10 lakh\nApply at any bank or [mudra.org.in](https://mudra.org.in/).'
    },
    {
        keywords: ['skill', 'training', 'pmkvy', 'employment', 'job'],
        response: '📚 **PM Kaushal Vikas Yojana (PMKVY)** offers free skill training with certification and placement assistance for youth aged 15-45. Find training centers at [pmkvyofficial.org](https://www.pmkvyofficial.org/).'
    },
    {
        keywords: ['pension', 'retirement', 'old age', 'senior', 'atal', 'apy'],
        response: '👴 **Atal Pension Yojana (APY)** guarantees ₹1,000–₹5,000/month pension after age 60 for those in the unorganised sector (age 18–40). Enroll at any bank branch or at [enps.nsdl.com](https://enps.nsdl.com/).'
    },
    {
        keywords: ['lpg', 'gas', 'cylinder', 'ujjwala', 'cooking'],
        response: '🔥 **PM Ujjwala Yojana (PMUY)** provides free LPG connections to BPL/SC/ST women households. Apply at your nearest LPG distributor or at [pmuy.gov.in](https://pmuy.gov.in/).'
    },
    {
        keywords: ['document', 'aadhaar', 'required', 'apply', 'documents needed'],
        response: '📄 **Common documents** required for most schemes:\n1. Aadhaar Card (mandatory)\n2. Bank Account Passbook\n3. Income Certificate\n4. Caste Certificate (if applicable)\n5. Passport-size photograph\n6. Ration Card / BPL Card\n\nSpecific requirements vary by scheme.'
    },
    {
        keywords: ['eligibility', 'qualify', 'eligible', 'check', 'who can apply'],
        response: '✅ Eligibility varies by scheme. Click **"Find Schemes For You"** on our homepage to get a **personalized list** of schemes you qualify for based on your age, income, occupation, location, and social category!'
    },
    {
        keywords: ['mgnrega', 'nrega', 'work', '100 days', 'rural employment'],
        response: '👷 **MGNREGA** guarantees **100 days of paid work** per year to rural households. Any adult rural resident can apply for a Job Card at the local Gram Panchayat office.'
    },
    {
        keywords: ['girl', 'daughter', 'sukanya', 'beti bachao'],
        response: '👧 Two great schemes for girl children:\n1. **Sukanya Samriddhi Yojana**: 8.2% p.a. savings account for girls below 10\n2. **Beti Bachao Beti Padhao**: Welfare services, scholarships and skill support for girls\nOpen an SSY account at any post office or bank!'
    },
    {
        keywords: ['solar', 'surya', 'surya ghar', 'electricity', 'power', 'bijli'],
        response: '☀️ **PM Surya Ghar: Muft Bijli Yojana** provides up to ₹78,000 subsidy for installing rooftop solar panels, giving up to 300 units of free electricity per month. Apply at [pmsuryaghar.gov.in](https://pmsuryaghar.gov.in/).'
    },
    {
        keywords: ['vishwakarma', 'artisan', 'craftsman', 'carpenter', 'tailor', 'blacksmith'],
        response: '🛠️ **PM Vishwakarma Scheme** supports traditional artisans with ID cards, ₹15,000 modern toolkit incentives, skill training stipend of ₹500/day, and collateral-free enterprise loans up to ₹3 lakh at 5% interest. Apply at [pmvishwakarma.gov.in](https://pmvishwakarma.gov.in/).'
    },
    {
        keywords: ['fasal bima', 'crop insurance', 'pmfby', 'drought', 'flood crop'],
        response: '🌱 **PM Fasal Bima Yojana (PMFBY)** provides low-cost crop insurance (only 1.5% to 2% farmer premium) against drought, floods, pests, and unseasonal rains. Register at [pmfby.gov.in](https://pmfby.gov.in/).'
    },
    {
        keywords: ['ev', 'electric vehicle', 'electric bike', 'e-drive', 'fame'],
        response: '⚡ **PM E-DRIVE / FAME II** offers upfront consumer subsidies up to ₹10,000 on electric 2-wheelers and ₹50,000 on electric 3-wheelers directly at the dealership invoice!'
    },
    {
        keywords: ['hello', 'hi', 'namaste', 'hey', 'start'],
        response: '🙏 **Namaste!** Welcome to JanSahay AI. I can help you:\n- Find government schemes you\'re eligible for\n- Understand scheme benefits and requirements\n- Guide you through the application process\n\nWhat would you like to know today?'
    }
];

const ragService = require('../services/ragService');

// ── POST /api/chat ────────────────────────────────────────────
exports.chat = async (req, res) => {
    const { message, profile } = req.body;

    if (!message || !message.trim()) {
        return res.status(400).json({ success: false, error: 'Message cannot be empty' });
    }

    // 1. Try RAG Service first if initialized
    if (ragService && ragService.isReady) {
        try {
            const ragResult = await ragService.chatQuery(message, profile || null);
            if (ragResult && ragResult.answer) {
                return res.json({
                    success:          true,
                    message:          ragResult.answer,
                    mentionedSchemes: ragResult.mentionedSchemes || [],
                    suggestFindSchemes: !!ragResult.suggestFindSchemes,
                    source:           ragResult.source || 'rag-llm',
                    timestamp:        new Date().toISOString()
                });
            }
        } catch (err) {
            console.warn('RAG chat query failed, falling back to KB:', err.message);
        }
    }

    const lowerMsg = message.toLowerCase();

    // 2. Search knowledge base for matching keywords
    let botResponse = null;
    for (const entry of KB) {
        if (entry.keywords.some(kw => lowerMsg.includes(kw))) {
            botResponse = entry.response;
            break;
        }
    }

    // 3. Default fallback
    if (!botResponse) {
        botResponse = `I found your question about **"${message}"**. While I may not have a specific answer ready, I suggest:\n\n1. 🔍 Use the **Find Schemes For You** button for personalized recommendations\n2. 📋 Browse our **Categories** section to explore schemes by topic\n3. 🏛️ Visit [myScheme.gov.in](https://www.myscheme.gov.in/) for the official government portal\n\nIs there anything specific I can help clarify? 😊`;
    }

    res.json({
        success:   true,
        message:   botResponse,
        source:    'knowledge-base',
        timestamp: new Date().toISOString()
    });
};
