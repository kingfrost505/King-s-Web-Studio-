"use strict";

document.addEventListener("DOMContentLoaded", () => {

    // ========================================
    // MOBILE NAVIGATION
    // ========================================

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    function closeMenu() {
        if (!menuToggle || !navLinks) {
            return;
        }

        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );
    }

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navLinks.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );
        });

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        document.addEventListener("click", (event) => {
            const clickedInsideNavigation =
                navLinks.contains(event.target) ||
                menuToggle.contains(event.target);

            if (!clickedInsideNavigation) {
                closeMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 760) {
                closeMenu();
            }
        });
    }


    // ========================================
    // CURRENT YEAR IN FOOTER
    // ========================================

    const currentYear = document.getElementById("current-year");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // ========================================
    // SERVICE SELECTION
    // ========================================

    const websiteType = document.getElementById("website-type");

    document.querySelectorAll("[data-service]").forEach((link) => {

        link.addEventListener("click", () => {

            if (!websiteType) {
                return;
            }

            const requestedService = link.dataset.service;

            const matchingOption = Array.from(
                websiteType.options
            ).find((option) => option.value === requestedService);

            if (matchingOption) {
                websiteType.value = requestedService;
            }
        });
    });


    // ========================================
    // WHATSAPP ORDER FORM
    // ========================================

    const orderForm = document.getElementById("order-form");
    const formMessage = document.getElementById("form-message");
    const submitButton = orderForm
        ? orderForm.querySelector('button[type="submit"]')
        : null;

    const customerName = document.getElementById("customer-name");
    const customerEmail = document.getElementById("customer-email");
    const budgetElement = document.getElementById("budget");
    const projectDetails = document.getElementById("project-details");

    // Your WhatsApp number in international format,
    // without the plus sign, spaces, or dashes.
    const whatsappNumber = "2349052769366";

    if (orderForm) {

        orderForm.addEventListener("submit", (event) => {

            event.preventDefault();

            if (!orderForm.reportValidity()) {
                return;
            }

            const name = customerName.value.trim();
            const email = customerEmail.value.trim();
            const service = websiteType.value;
            const budget = budgetElement.value;
            const details = projectDetails.value.trim();

            if (!name || !email || !service || !budget || !details) {

                if (formMessage) {
                    formMessage.textContent =
                        "Please complete all the required fields.";
                }

                return;
            }

            const message = [
                "👑 NEW WEBSITE ORDER",
                "King's Web Studio",
                "",
                "Customer Name: " + name,
                "Customer Email: " + email,
                "Requested Service: " + service,
                "Estimated Budget: " + budget,
                "",
                "Project Details:",
                details,
                "",
                "This request was prepared through the King's Web Studio website."
            ].join("\n");

            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(message);

            if (formMessage) {
                formMessage.textContent =
                    "Opening WhatsApp. Review your order and press Send to submit it.";
            }

            /*
             * Open WhatsApp directly from the submit event.
             * This helps avoid popup blockers.
             */
            const whatsappWindow = window.open(
                whatsappURL,
                "_blank"
            );

            if (whatsappWindow) {
                whatsappWindow.opener = null;
            } else {
                /*
                 * If the browser blocks the new tab,
                 * navigate to WhatsApp in the current tab.
                 */
                window.location.href = whatsappURL;
            }

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = "Opening WhatsApp...";

                window.setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent =
                        "Continue to WhatsApp ↗";
                }, 3000);
            }
        });
    }

});