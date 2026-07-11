"use strict";

const header = document.getElementById("header");
const navigation = document.getElementById("navigation");
const mobileMenuButton = document.getElementById("mobileMenuButton");
const appointmentForm = document.getElementById("appointmentForm");
const formMessage = document.getElementById("formMessage");
const currentYear = document.getElementById("currentYear");

// Başında + olmadan, ülke koduyla birlikte yazılmalıdır.
const whatsappNumber = "const whatsappNumber = "905349782444";";

function toggleMobileMenu() {
    const isMenuOpen = navigation.classList.toggle("active");

    mobileMenuButton.classList.toggle("active", isMenuOpen);
    document.body.classList.toggle("menu-open", isMenuOpen);

    mobileMenuButton.setAttribute(
        "aria-expanded",
        String(isMenuOpen)
    );
}

function closeMobileMenu() {
    navigation.classList.remove("active");
    mobileMenuButton.classList.remove("active");
    document.body.classList.remove("menu-open");

    mobileMenuButton.setAttribute("aria-expanded", "false");
}

function updateHeaderStyle() {
    if (window.scrollY > 20) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
}

function getServiceName(serviceValue) {
    const services = {
        "kilo-yonetimi": "Kilo Yönetimi",
        "online-diyet": "Online Diyet",
        "gebelik": "Gebelikte Beslenme",
        "sporcu": "Sporcu Beslenmesi",
        "cocuk": "Çocuk ve Ergen Beslenmesi",
        "hastalik": "Hastalıklarda Beslenme"
    };

    return services[serviceValue] || "Belirtilmedi";
}

function createWhatsAppMessage(formData) {
    const fullName = formData.get("fullName")?.trim();
    const phone = formData.get("phone")?.trim();
    const email = formData.get("email")?.trim();
    const service = formData.get("service");
    const message = formData.get("message")?.trim();

    const serviceName = getServiceName(service);

    return `
Merhaba Diyetisyen Güldeniz KAYA,

Web siteniz üzerinden randevu talebi oluşturmak istiyorum.

Ad Soyad: ${fullName}
Telefon: ${phone}
E-posta: ${email}
Danışmanlık Türü: ${serviceName}
Hedef / Açıklama: ${message || "Belirtilmedi"}

Uygun olduğunuzda benimle iletişime geçebilir misiniz?
    `.trim();
}

mobileMenuButton.addEventListener("click", toggleMobileMenu);

navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
});

window.addEventListener("scroll", updateHeaderStyle);

window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
        closeMobileMenu();
    }
});

appointmentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(appointmentForm);

    const fullName = formData.get("fullName")?.trim();
    const phone = formData.get("phone")?.trim();
    const email = formData.get("email")?.trim();
    const service = formData.get("service");

    if (!fullName || !phone || !email || !service) {
        showFormMessage(
            "Lütfen zorunlu alanların tamamını doldurun.",
            "error"
        );

        return;
    }

    const whatsappMessage = createWhatsAppMessage(formData);
    const encodedMessage = encodeURIComponent(whatsappMessage);

    const whatsappUrl =
        `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    showFormMessage(
        "Bilgileriniz hazırlandı. WhatsApp açılıyor...",
        "success"
    );

    window.open(
        whatsappUrl,
        "_blank",
        "noopener,noreferrer"
    );
});

currentYear.textContent = new Date().getFullYear();

updateHeaderStyle();
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
    const questionButton = item.querySelector(".faq-question");

    questionButton.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        faqItems.forEach((faqItem) => {
            faqItem.classList.remove("active");
        });

        if (!isActive) {
            item.classList.add("active");
        }
    });
});const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
    const questionButton = item.querySelector(".faq-question");

    questionButton.addEventListener("click", () => {
        item.classList.toggle("active");
    });
});