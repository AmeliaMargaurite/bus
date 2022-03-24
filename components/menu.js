class Menu extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		const lightMode = {
			"--primary": "0, 0%, 9%",
			"--background": "0, 0%, 89%",
			"--highlight": "162deg 90% 19%",
		};

		const darkMode = {
			"--primary": "0, 0%, 89%",
			"--background": "0, 0%, 9%",
			"--highlight": "162deg 90% 48%",
		};

		const setDarkMode = () => {
			localStorage.setItem("color-mode", "dark");
			Object.keys(darkMode).forEach((prop) =>
				root.style.setProperty(prop, darkMode[prop])
			);
		};

		const setLightMode = () => {
			localStorage.setItem("color-mode", "light");
			Object.keys(lightMode).forEach((prop) => {
				root.style.setProperty(prop, lightMode[prop]);
			});
		};
		const root = document.documentElement;

		const activePage = this.getAttribute("activePage");
		const activeSubPage =
			activePage === "vintage-bus" ? this.getAttribute("activeSubPage") : false;
		// prettier-ignore
		this.innerHTML = `
    <div class="menu">
    <div class='switch' id='switch' ></div>
			<div class='wrapper'>
				<h3>BUS</h3>
				<p>Mental Health Support Chat</p>
			</div>
			<ul>
				<a href="/" class="${activePage === "home" ? "active" : ""}">
                    <li>
                    Home
                    </li>
                </a>
				<a href="/alternatives.html" class="${
					activePage === "alternatives" ? "active" : ""
				}" >
                    <li>
                        Self-harm alternatives
                    </li>
                </a>
				<a href="/guidelines.html" class="${
					activePage === "guidelines" ? "active" : ""
				}">
                    <li >
                        Guidelines
                    </li>
                </a>
                <a href="/vintage-bus.html" class="${
									activePage === "vintage-bus" ? "active" : ""
								}">
                    <li >
                        Vintage BUS
                    </li>


                    ${activePage === "vintage-bus" ? `
                        <ul class='subList'>
                            <a href="/vintage-bus.html" class="${activeSubPage === "introduction" ? "active" : ""}">
                                <li >
                                    Introduction
                                </li>
                            </a>   
                            <a href="/vintage-bus/what.html" class="${activeSubPage === "what" ? "active" : ""}">
                                <li >
                                    What is Self-Injury?
                                </li>
                            </a>
                            <a href="/vintage-bus/why.html" class="${activeSubPage === "why" ? "active" : ""}">
                                <li >
                                    Why some people self-injure
                                </li>
                            </a> 
                            <a href="/vintage-bus/demographics.html" class="${activeSubPage === "demographics" ? "active" : ""}">
                                <li >
                                    Demographics -- Who SI's?
                                </li>
                            </a>
                        </ul>   
                    `: ""
                }
                </a>
			</ul>
		</div>
    `;

		const handleSwitch = () => {
			const colorMode = localStorage.getItem("color-mode");
			const switchBtn = document.getElementById("switch");

			if (colorMode && colorMode === "dark") {
				setLightMode();
				switchBtn.classList.remove("on");
			} else {
				setDarkMode();
				switchBtn.classList.add("on");
			}
		};
		const switchBtn = document.getElementById("switch");
		switchBtn.addEventListener("click", handleSwitch);

		const colorMode = localStorage.getItem("color-mode");

		const prefersDark =
			(window.matchMedia &&
				window.matchMedia("(prefers-color-scheme: dark)").matches) ||
			colorMode === "dark";

		if (prefersDark) {
			setDarkMode();
			switchBtn.classList.add("on");
		} else {
			setLightMode();
			switchBtn.classList.remove("on");
		}
	}
}

customElements.define("menu-component", Menu);
