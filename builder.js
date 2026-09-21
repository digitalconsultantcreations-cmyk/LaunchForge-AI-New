document.addEventListener("DOMContentLoaded", () => {
  const generateButton = document.getElementById("generateBtn");
  const promptInput = document.getElementById("businessPrompt");
  const chatMessages = document.getElementById("chatMessages");
  const preview = document.getElementById("preview");
  const creditsDisplay = document.getElementById("credits");

  let credits = 25;

  function addMessage(type, text) {
    const message = document.createElement("div");
    message.className = `message ${type}`;
    message.textContent = text;

    if (chatMessages) {
      chatMessages.appendChild(message);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }

  function generateBusiness(prompt) {
    const text = prompt.toLowerCase();

    let business = {
      name: "GrowthForge",
      tagline: "Smart solutions for modern businesses.",
      description:
        "A modern business designed to help customers save time, solve problems, and grow.",
      services: [
        "Business Strategy",
        "Digital Solutions",
        "Customer Support"
      ],
      cta: "Get Started Today"
    };

    if (
      text.includes("car") ||
      text.includes("auto") ||
      text.includes("detailing")
    ) {
      business = {
        name: "DriveShine Auto Care",
        tagline: "Professional car care that comes to you.",
        description:
          "A convenient mobile auto detailing business providing professional vehicle cleaning and detailing services.",
        services: [
          "Mobile Car Detailing",
          "Interior Deep Cleaning",
          "Exterior Wash & Wax",
          "Paint Protection"
        ],
        cta: "Book Your Detail"
      };
    }

    if (
      text.includes("cleaning") ||
      text.includes("cleaner") ||
      text.includes("janitorial")
    ) {
      business = {
        name: "PureSpace Cleaning",
        tagline: "A cleaner space. A better day.",
        description:
          "A professional cleaning service helping homes and businesses maintain clean, healthy and welcoming spaces.",
        services: [
          "Residential Cleaning",
          "Office Cleaning",
          "Deep Cleaning",
          "Move-In & Move-Out Cleaning"
        ],
        cta: "Request a Quote"
      };
    }

    if (
      text.includes("coach") ||
      text.includes("coaching") ||
      text.includes("consulting")
    ) {
      business = {
        name: "Elevate Coaching",
        tagline: "Turn your goals into measurable progress.",
        description:
          "A coaching business helping clients create practical plans, improve performance and achieve meaningful goals.",
        services: [
          "One-on-One Coaching",
          "Goal Planning",
          "Business Strategy",
          "Accountability Programs"
        ],
        cta: "Book a Consultation"
      };
    }

    if (
      text.includes("restaurant") ||
      text.includes("food") ||
      text.includes("cafe") ||
      text.includes("café")
    ) {
      business = {
        name: "Urban Table",
        tagline: "Fresh food. Great moments.",
        description:
          "A modern food business focused on delicious meals, convenient ordering and memorable customer experiences.",
        services: [
          "Fresh Meals",
          "Takeout",
          "Delivery",
          "Catering"
        ],
        cta: "Order Now"
      };
    }

    if (
      text.includes("photo") ||
      text.includes("photography") ||
      text.includes("photographer")
    ) {
      business = {
        name: "VisionFrame Studios",
        tagline: "Your moments. Beautifully captured.",
        description:
          "A professional photography business creating high-quality images for individuals, brands and special events.",
        services: [
          "Portrait Photography",
          "Business Photography",
          "Event Photography",
          "Brand Photography"
        ],
        cta: "Book a Session"
      };
    }

    return business;
  }

  function displayBusiness(business) {
    if (!preview) return;

    preview.innerHTML = `
      <div class="preview-business">
        <div class="preview-badge">AI GENERATED BUSINESS</div>

        <h1>${business.name}</h1>

        <h2>${business.tagline}</h2>

        <p>${business.description}</p>

        <div class="preview-services">
          ${business.services
            .map(
              service => `
                <div class="preview-service">
                  <span>✦</span>
                  ${service}
                </div>
              `
            )
            .join("")}
        </div>

        <button class="preview-cta">
          ${business.cta}
        </button>
      </div>
    `;
  }

  async function generate() {
    if (!promptInput) {
      alert("Builder input could not be found.");
      return;
    }

    const prompt = promptInput.value.trim();

    if (!prompt) {
      alert("Tell LaunchForge what business you want to build first.");
      promptInput.focus();
      return;
    }

    if (credits <= 0) {
      alert("You have used all your demo credits.");
      return;
    }

    credits--;

    if (creditsDisplay) {
      creditsDisplay.textContent = credits;
    }

    addMessage("user", prompt);

    if (generateButton) {
      generateButton.disabled = true;
      generateButton.textContent = "Generating...";
    }

    addMessage("ai", "I'm building your business now...");

    await new Promise(resolve => setTimeout(resolve, 1000));

    const business = generateBusiness(prompt);

    displayBusiness(business);

    addMessage(
      "ai",
      `Done! I created ${business.name} with a business concept, services and call-to-action.`
    );

    if (generateButton) {
      generateButton.disabled = false;
      generateButton.textContent = "Generate My Business ✦";
    }
  }

  if (generateButton) {
    generateButton.addEventListener("click", generate);
  } else {
    console.error("LaunchForge: Generate button not found.");
  }

  if (promptInput) {
    promptInput.addEventListener("keydown", event => {
      if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        generate();
      }
    });
  } else {
    console.error("LaunchForge: Business prompt input not found.");
  }
});
