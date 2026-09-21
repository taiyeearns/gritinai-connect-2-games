// ============================================================================
// GAME 2: Tech & AI Quiz — 5 Complete Sets of 15 Questions (75 Questions)
// Includes deep coverage of GritinAI products, Connect 2.0, Africa's AI ecosystem,
// Foundation Models, Transformers, Deep Learning, Hardware & Software Engineering
// ============================================================================

// ----------------------------------------------------------------------------
// SET 1: AI Foundations & The Rise of GritinAI
// ----------------------------------------------------------------------------
const SET1 = [
  {
    type: 'quiz',
    label: 'What does the "GPT" in ChatGPT stand for?',
    subtitle: 'The foundational architectural paradigm powering modern LLMs',
    options: ['General Pre-trained Tensor', 'Generative Pre-trained Transformer', 'Global Predictive Translation', 'Graph Processed Transformer'],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What is the official overarching theme of GritinAI Connect 2.0?',
    subtitle: 'Guiding Africa from AI awareness into measurable action',
    options: ['AI for Entertainment', 'Accelerating Africa\'s Digital Economy with AI', 'The Rise of Quantum Robotics', 'Coding for Tomorrow'],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'In 2017, Google researchers published which landmark paper introducing Transformers?',
    subtitle: 'The seminal paper that revolutionized natural language processing',
    options: ['Deep Residual Learning', 'Attention Is All You Need', 'Mastering the Game of Go', 'Transformers in Vision'],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Which GritinAI product is purpose-built as an AI prototyping platform for builders?',
    subtitle: 'Featured in practical developer workshops at Connect 2.0',
    options: ['Rapid', 'Ubá', 'Omnili', 'Apex'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Who devised the famous 1950 "Imitation Game" benchmark for machine intelligence?',
    subtitle: 'Widely celebrated British mathematician and pioneer of computing',
    options: ['John von Neumann', 'Alan Turing', 'Claude Shannon', 'Ada Lovelace'],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What term describes an LLM generating plausible-sounding facts that are completely untrue?',
    subtitle: 'A primary safety and accuracy challenge in generative AI',
    options: ['Overfitting', 'Hallucination', 'Drifting', 'Quantization Error'],
    correct: 1,
    timer: 10
  },
  {
    type: 'quiz',
    label: 'Where in Nigeria is GritinAI Connect 2.0 held on September 26, 2026?',
    subtitle: 'Historic cultural capital of Edo State',
    options: ['Eko Hotel, Lagos', 'International Conference Centre, Abuja', 'Victor Uwaifo Creative Hub, Benin City', 'Port Harcourt Civic Centre'],
    correct: 2,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Which company developed AlphaFold, revolutionizing protein structure prediction?',
    subtitle: 'A historic breakthrough in computational structural biology',
    options: ['OpenAI', 'Google DeepMind', 'Meta AI (FAIR)', 'Anthropic'],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What alignment method uses human preferences to fine-tune conversational AI models?',
    subtitle: 'Responsible for turning raw base models into helpful assistants',
    options: ['RLHF (Reinforcement Learning from Human Feedback)', 'GAN (Generative Adversarial Network)', 'CNN (Convolutional Neural Network)', 'SVM (Support Vector Machine)'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Which GritinAI smart business product is built for inventory management and local commerce?',
    subtitle: 'Empowering local retail and MSMEs across Nigerian states',
    options: ['Ubá', 'Rapid', 'Omnili', 'Konga'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What does "RAG" stand for in enterprise generative AI architectures?',
    subtitle: 'Connecting models to custom databases without full retraining',
    options: ['Real-time Automated Generation', 'Retrieval-Augmented Generation', 'Recursive Adversarial Gradient', 'Relational Array Graphing'],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Which programming language is the undisputed industry standard for deep learning?',
    subtitle: 'Supported by frameworks like PyTorch, TensorFlow, and JAX',
    options: ['C++', 'Rust', 'Python', 'Java'],
    correct: 2,
    timer: 10
  },
  {
    type: 'quiz',
    label: 'Approximately how many participants attended the inaugural GritinAI Connect 1.0 in 2025?',
    subtitle: 'Gathering innovators from Abuja, Lagos, and across Nigeria',
    options: ['100+', '300+', '1,000+', '10,000+'],
    correct: 2,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What type of hardware semiconductor is predominantly used to train massive frontier LLMs?',
    subtitle: 'Specialized chips originally engineered for 3D graphics rendering',
    options: ['CPUs (Central Processing Units)', 'GPUs (Graphics Processing Units)', 'Hard Disk Drives', 'Quantum Transistors'],
    correct: 1,
    timer: 10
  },
  {
    type: 'quiz',
    label: 'Which open-weight frontier model family was released by Meta under Mark Zuckerberg?',
    subtitle: 'Spurred a global open-source AI renaissance starting in 2023',
    options: ['Gemini', 'Llama', 'Claude', 'Mistral'],
    correct: 1,
    timer: 10
  }
];

// ----------------------------------------------------------------------------
// SET 2: Practical AI, GritinAI Ecosystem & Innovation
// ----------------------------------------------------------------------------
const SET2 = [
  {
    type: 'quiz',
    label: 'What is GritinAI\'s dedicated live mentoring and learning platform called?',
    subtitle: 'Connecting African tech talent with expert industry mentors',
    options: ['Omnili', 'Ubá', 'Rapid', 'Coursera'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Which keynote speaker presents "The Catalyst Effect: Harnessing AI for African Growth" at Connect 2.0?',
    subtitle: 'Keynote spotlight on economic growth and entrepreneurship',
    options: ['Mrs Mary Okonkwo', 'Mrs Olamide Efosa', 'Peter Nnachor', 'Favour Chima'],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What does "LLM" stand for in modern AI engineering?',
    subtitle: 'The class of neural networks behind ChatGPT, Claude, and Gemini',
    options: ['Low Latency Matrix', 'Large Language Model', 'Linear Logic Module', 'Local Learning Memory'],
    correct: 1,
    timer: 10
  },
  {
    type: 'quiz',
    label: 'In neural networks, what mathematical operation combines inputs and synaptic weights?',
    subtitle: 'The fundamental computation repeated millions of times per forward pass',
    options: ['Dot Product (Matrix Multiplication)', 'Square Root', 'Fourier Inversion', 'Prime Factorization'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Which speaker delivers the keynote "From Code to Career: Leveraging AI for Youth Employment"?',
    subtitle: 'Focusing on workforce readiness for African graduates and developers',
    options: ['Mrs Mary Okonkwo', 'Mrs Olamide Efosa', 'Mrs Ysika', 'Semfon Emmanuel'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What algorithm is universally used to calculate error gradients and update neural weights?',
    subtitle: 'Popularized by Rumelhart, Hinton, and Williams in 1986',
    options: ['QuickSort', 'Backpropagation', 'Dijkstra’s Algorithm', 'Binary Search'],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Which workshop track at Connect 2.0 is led by Peter Nnachor for hands-on building?',
    subtitle: 'Demonstrating rapid AI prototyping and deployment',
    options: ['Build with Rapid', 'Blockchain 101', 'Figma to Code', 'Quantum Circuits'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What is the phenomenon where a machine learning model memorizes training noise instead of generalizing?',
    subtitle: 'High training accuracy but terrible real-world performance',
    options: ['Underfitting', 'Quantization', 'Overfitting', 'Tokenization'],
    correct: 2,
    timer: 10
  },
  {
    type: 'quiz',
    label: 'Which university in Benin City collaborates with tech hubs and hosts the ADEC engineering centre?',
    subtitle: 'Premier federal tertiary institution in Edo State',
    options: ['University of Lagos (UNILAG)', 'University of Benin (UNIBEN)', 'Ahmadu Bello University (ABU)', 'University of Ibadan (UI)'],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What is the name of the popular open-source platform known as the "GitHub of Machine Learning"?',
    subtitle: 'Home to hundreds of thousands of open-source models and datasets',
    options: ['Docker Hub', 'Hugging Face', 'Kaggle', 'npm'],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What initiative at Connect 2.0 provides free AI consultations directly to business owners?',
    subtitle: 'Helping small and medium enterprises automate operations',
    options: ['MSME Clinic', 'Hackathon Arena', 'Executive VIP Lounge', 'Investor Round'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What is the primary function of "Tokens" in Large Language Models?',
    subtitle: 'How models slice and read raw human text',
    options: ['Crypto currency coins', 'Sub-word chunks of text converted to numerical IDs', 'Security passwords', 'Audio frequencies'],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'GritinAI has reached how many students through educational initiatives and tech programs?',
    subtitle: 'Demonstrating long-term grassroots educational impact across Nigeria',
    options: ['500+', '2,000+', '10,000+', '1,000,000+'],
    correct: 2,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Which type of AI generation model works by progressively reversing added Gaussian noise?',
    subtitle: 'The architecture behind Midjourney, Stable Diffusion, and Sora',
    options: ['Diffusion Models', 'Recurrent Neural Networks', 'Decision Trees', 'Perceptrons'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What open-source deep learning framework was originally created by Facebook’s FAIR team?',
    subtitle: 'Currently the dominant framework for AI research worldwide',
    options: ['PyTorch', 'TensorFlow', 'Caffe', 'Theano'],
    correct: 0,
    timer: 10
  }
];

// ----------------------------------------------------------------------------
// SET 3: African AI Transformation, Governance & Deep Tech
// ----------------------------------------------------------------------------
const SET3 = [
  {
    type: 'quiz',
    label: 'Which public service training academy in Edo State partnered with GritinAI on digital transformation?',
    subtitle: 'Known as JOOPSA in Benin City',
    options: ['John Odigie-Oyegun Public Service Academy', 'Lagos Business School', 'National Institute for Policy', 'Administrative Staff College of Nigeria'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What does "NLP" stand for in computational computer science?',
    subtitle: 'The branch of AI enabling machines to read, understand, and generate human languages',
    options: ['Network Link Protocol', 'Natural Language Processing', 'Neural Linear Programming', 'Node Layer Parsing'],
    correct: 1,
    timer: 10
  },
  {
    type: 'quiz',
    label: 'Who moderates the high-impact panel session "Catalysing Africa’s Digital Economy" at Connect 2.0?',
    subtitle: 'Guiding dialogue among leaders in policy, capital, and engineering',
    options: ['Mrs Ysika', 'Peter Nnachor', 'Hope Omo', 'Favour Chima'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What is the name of the nationwide Nigerian federal initiative training 3 million tech talents?',
    subtitle: 'Spearheaded by the Federal Ministry of Communications, Innovation & Digital Economy',
    options: ['3MTT (3 Million Technical Talents)', 'N-Power Tech', 'Code Nigeria', 'Digital Pulse 2030'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'In transformer models, what mechanism computes mathematical relevance between every word in a sequence?',
    subtitle: 'Enables transformers to process full paragraphs simultaneously unlike RNNs',
    options: ['Self-Attention Mechanism', 'Convolutional Stride', 'Random Dropout', 'Batch Normalization'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Which community event at Connect 2.0 gives rising African AI founders a spotlight to pitch?',
    subtitle: 'Facilitated by Favour Chima on the afternoon stage',
    options: ['Startup Pitch / Community Forum', 'Alumni Dinner', 'Gala Night', 'Code Sprint 100'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What is "Fine-Tuning" in machine learning?',
    subtitle: 'Adapting a pre-trained foundation model to a specific domain or task',
    options: ['Cleaning hardware dust from server racks', 'Training a pre-existing model on a specialized dataset', 'Adjusting monitor screen brightness', 'Translating code from Python to C'],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Which prominent school in Edo State partnered with GritinAI to deploy school management automation?',
    subtitle: 'Torch Bearers Academy transformed their administrative digital systems',
    options: ['TBA World Academy (Torch Bearer)', 'Kings College', 'Corona Schools', 'Loyola Jesuit'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What is a "Vector Embedding" in modern machine learning systems?',
    subtitle: 'How concepts and text are represented for semantic similarity searching',
    options: ['A compressed image file', 'A dense numerical array representing semantic meaning in geometric space', 'An encrypted password hash', 'An HTML styling tag'],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What is the name of the specialised tech community in Benin City partnering with GritinAI Connect?',
    subtitle: 'Local chapter of Google Developer Groups',
    options: ['GDG Benin', 'Lagos Java User Group', 'Nairobi PyCon', 'Abuja Cloud Club'],
    correct: 0,
    timer: 10
  },
  {
    type: 'quiz',
    label: 'Which Silicon Valley chipmaker became the world’s most valuable company due to AI data center demand?',
    subtitle: 'Makers of the H100, H200, and Blackwell B200 AI GPUs',
    options: ['Intel', 'AMD', 'NVIDIA', 'Qualcomm'],
    correct: 2,
    timer: 10
  },
  {
    type: 'quiz',
    label: 'What does "Computer Vision" (CV) primarily enable computers to do?',
    subtitle: 'Used in autonomous driving, facial recognition, and medical radiography',
    options: ['Play audio files faster', 'Interpret and extract meaningful information from digital images and video', 'Boost internet connection bandwidth', 'Cool down CPU processors'],
    correct: 1,
    timer: 10
  },
  {
    type: 'quiz',
    label: 'How many key focus sectors does GritinAI Connect 2.0 emphasize for practical AI implementation?',
    subtitle: 'Governance, Education, Healthcare, Agriculture, and MSME Development',
    options: ['2', '3', '5', '12'],
    correct: 2,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What term describes an AI system capable of understanding both text, images, and audio concurrently?',
    subtitle: 'Found in frontier models like GPT-4o and Gemini 1.5 Pro',
    options: ['Unimodal', 'Multimodal', 'Bicontinuous', 'Hyperbolic'],
    correct: 1,
    timer: 10
  },
  {
    type: 'quiz',
    label: 'What is the name of OpenAI\'s revolutionary text-to-video generation AI model?',
    subtitle: 'Capable of generating photorealistic 60-second video scenes from text prompts',
    options: ['Sora', 'DALL-E', 'Whisper', 'Codex'],
    correct: 0,
    timer: 10
  }
];

// ----------------------------------------------------------------------------
// SET 4: Engineering, Frontiers & Enterprise Intelligence
// ----------------------------------------------------------------------------
const SET4 = [
  {
    type: 'quiz',
    label: 'What is the primary role of an "AI Agent" compared to a simple chatbot?',
    subtitle: 'The shift from answering questions to autonomous execution',
    options: ['It only talks in robotic accents', 'It can autonomously plan, use tools, call APIs, and execute complex workflows', 'It requires human manual approval for every syllable', 'It runs without electricity'],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'GritinAI has served partner organizations across how many Nigerian states to date?',
    subtitle: 'Demonstrating expanding regional and national footprint',
    options: ['1', '3+', '36', '50'],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What does "API" stand for in software and AI application integration?',
    subtitle: 'The standard interface connecting frontend apps to AI models',
    options: ['Application Programming Interface', 'Automated Program Identifier', 'Algorithmic Predictive Index', 'Active Processing Instruction'],
    correct: 0,
    timer: 10
  },
  {
    type: 'quiz',
    label: 'Which GritinAI web product domain connects developers directly to rapid prototyping tools?',
    subtitle: 'Explore the dedicated app portal',
    options: ['rapid.gritinai.com', 'ai.gritinai.com', 'prototype.africa', 'builder.io'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What is "Prompt Engineering" in the context of large language models?',
    subtitle: 'Technique to elicit high-precision reasoning and structured outputs',
    options: ['Building server motherboard hardware', 'Crafting structured inputs and context to guide model responses', 'Fixing Wi-Fi router connectivity', 'Writing raw binary machine code'],
    correct: 1,
    timer: 10
  },
  {
    type: 'quiz',
    label: 'Which French AI research company created the open-weights Mistral 7B and Mixtral 8x7B models?',
    subtitle: 'Founded by former researchers from Meta FAIR and DeepMind',
    options: ['Mistral AI', 'Stability AI', 'Aleph Alpha', 'Cohere'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What is the full URL for GritinAI Connect 2.0 conference portal and registration?',
    subtitle: 'Official conference platform for schedules, tickets, and pitch applications',
    options: ['gritinaiconnect.gritinai.com', 'connect2026.com', 'ai-benin.ng', 'gritin.eventbrite.com'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What does "Weights & Biases" or parameters measure in an AI neural network?',
    subtitle: 'Frontier models now possess hundreds of billions of them',
    options: ['The physical weight of the server in kilograms', 'The tunable numeric values adjusted during model training', 'The number of employees at the AI company', 'The internet speed required'],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Which Nigerian agricultural tech initiative partnered with GritinAI to deploy farmer support tools?',
    subtitle: 'Featured in GritinAI client impact testimonials',
    options: ['Cool Agrip Connect', 'FarmCrowdy', 'AgroMall', 'ThriveAgric'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What is "Zero-Shot Learning" in artificial intelligence?',
    subtitle: 'Showcasing deep generalization capabilities of foundation models',
    options: ['A model performing a task without having seen any explicit training examples for it', 'A camera taking pictures without flash', 'Training an algorithm with zero computing power', 'A neural network that only outputs zero'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Which company created the Claude family of foundation models, focusing on "Constitutional AI"?',
    subtitle: 'Founded by former OpenAI research executives Dario and Daniela Amodei',
    options: ['Anthropic', 'Cohere', 'Inflection AI', 'Character.ai'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What is the primary benefit of "Model Quantization" (e.g., converting FP16 to INT8 or INT4)?',
    subtitle: 'Crucial for running AI locally on edge devices and smartphones',
    options: ['Drastically reduces memory footprint and enables faster inference on consumer hardware', 'Makes the model generate longer poems', 'Changes the model language to French', 'Increases training costs tenfold'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What is the official brand color palette identity for GritinAI Connect 2.0?',
    subtitle: 'Clean high-contrast digital look with electric cyan blue',
    options: ['Pure Blue (#0088FF) on Solid Dark (#0E0E0C)', 'Neon Green on Purple', 'Bright Pink on Orange', 'Burgundy on Gold'],
    correct: 0,
    timer: 10
  },
  {
    type: 'quiz',
    label: 'What does "TPU" stand for in Google\'s cloud computing infrastructure?',
    subtitle: 'Custom ASIC chips built specifically to accelerate TensorFlow and JAX',
    options: ['Tensor Processing Unit', 'Thermal Power Unit', 'Transient Pixel Unit', 'Tera Parallel Unix'],
    correct: 0,
    timer: 10
  },
  {
    type: 'quiz',
    label: 'In reinforcement learning, what mathematical term balances trying new actions vs choosing known rewards?',
    subtitle: 'Fundamental dilemma in agent decision-making',
    options: ['Exploration vs. Exploitation', 'Overfitting vs. Underfitting', 'Precision vs. Recall', 'Encryption vs. Decryption'],
    correct: 0,
    timer: 12
  }
];

// ----------------------------------------------------------------------------
// SET 5: Future Horizons, Superintelligence & African Tech Leadership
// ----------------------------------------------------------------------------
const SET5 = [
  {
    type: 'quiz',
    label: 'What does "AGI" represent as a long-term milestone in artificial intelligence research?',
    subtitle: 'The theoretical threshold of human-level cognitive breadth',
    options: ['Automated Graphics Interface', 'Artificial General Intelligence', 'Advanced Geometric Inference', 'Algorithmic Global Internet'],
    correct: 1,
    timer: 10
  },
  {
    type: 'quiz',
    label: 'What core mission guides GritinAI’s product development for local businesses?',
    subtitle: 'Stated prominently in the GritinAI corporate vision',
    options: ['Replacing local workforces with robots', 'Building practical AI tools that strengthen local ecosystems rather than replacing them', 'Selling cryptocurrency coins', 'Exclusively focusing on video games'],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Which prominent Nigerian global developer platform partnered with GritinAI to connect tech talent?',
    subtitle: 'Co-founded by Elohor Thomas to assess and place African software engineers',
    options: ['CodeLn', 'Andela', 'Decagon', 'TalentQL'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What architectural innovation enables modern LLMs to process context windows exceeding 1 million tokens?',
    subtitle: 'Used in Gemini 1.5 to analyze entire textbooks and video files in one prompt',
    options: ['Sparse Attention / FlashAttention', 'Punch Card Readers', 'Floppy Disk Caching', 'Analog Vacuum Tubes'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What is the official date of GritinAI Connect 2.0?',
    subtitle: 'Marking the premier AI conference in South-South Nigeria',
    options: ['September 26, 2026', 'December 25, 2026', 'January 1, 2027', 'July 4, 2026'],
    correct: 0,
    timer: 10
  },
  {
    type: 'quiz',
    label: 'What does "MoE" stand for in modern mega-scale neural network architecture?',
    subtitle: 'The architectural design powering Mixtral 8x7B and GPT-4',
    options: ['Mixture of Experts', 'Memory on Edge', 'Matrix of Equations', 'Module of Execution'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Which GritinAI portal offers dedicated training courses in Tech and AI skills?',
    subtitle: 'Upskilling the next generation of African engineers and data scientists',
    options: ['training.gritinai.com', 'learn.ai', 'udemy.com', 'school.ng'],
    correct: 0,
    timer: 10
  },
  {
    type: 'quiz',
    label: 'Who won the Turing Award (the "Nobel Prize of Computing") for pioneer work on Deep Learning?',
    subtitle: 'Known collectively as the "Godfathers of Deep Learning"',
    options: ['Geoffrey Hinton, Yann LeCun, and Yoshua Bengio', 'Steve Jobs, Bill Gates, and Michael Dell', 'Tim Berners-Lee and Vint Cerf', 'Linus Torvalds and Ken Thompson'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'In AI alignment, what does "The Alignment Problem" refer to?',
    subtitle: 'Ensuring advanced systems act in accordance with human values and safety',
    options: ['Aligning monitors on a developer desk', 'Ensuring powerful AI systems pursue goals intended by humans without harmful side effects', 'Centering text in CSS', 'Aligning battery pins inside laptops'],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'How many attendees are projected to attend GritinAI Connect 2.0 at the Victor Uwaifo Hub?',
    subtitle: 'Scaling up from 1,000+ attendees at Connect 1.0',
    options: ['50', '250', '1,500+', '50,000'],
    correct: 2,
    timer: 10
  },
  {
    type: 'quiz',
    label: 'What is "Synthetic Data" in contemporary machine learning training pipelines?',
    subtitle: 'Crucial for training when real-world human data is scarce or sensitive',
    options: ['Fake accounts on social media', 'Data artificially generated by computer simulations or AI models to train other models', 'Hardware cables made of plastic', 'Counterfeit currency bills'],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What key innovation did "LoRA" (Low-Rank Adaptation) introduce to fine-tuning LLMs?',
    subtitle: 'Reduced fine-tuning GPU memory requirements by over 80%',
    options: ['Freezing pre-trained model weights and training small rank decomposition matrices', 'Deleting half the layers randomly', 'Replacing Python with Assembly', 'Running models purely on battery power'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Which Edo State digital innovation agency collaborates closely with GritinAI programs?',
    subtitle: 'Pioneering public digital literacy and innovation from Benin City',
    options: ['Edo Digital Hub / Edo Innovates', 'Silicon Valley Africa', 'Kano ICT Park', 'Calabar Tech Valley'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What benchmark evaluates an LLM\'s capability to write working software and pass test cases?',
    subtitle: 'Created by OpenAI to evaluate Codex and code generation models',
    options: ['HumanEval', 'SpeedTest', 'Geekbench', 'PassMark'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What is the slogan and call to action echoed across GritinAI Connect 2.0?',
    subtitle: 'Encouraging every attendee to take the leap from theory into implementation',
    options: ['From Awareness to Action', 'Just Wait and See', 'Code in Silence', 'Theory Over Practice'],
    correct: 0,
    timer: 10
  }
];

module.exports = {
  set1: SET1,
  set2: SET2,
  set3: SET3,
  set4: SET4,
  set5: SET5
};
