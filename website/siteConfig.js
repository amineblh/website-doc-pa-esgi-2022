// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

module.exports = {
	title: 'easyTDV', // Title for your website.
	tagline: 'A Simple Python Framework for Training deploying IA model and visualize the results',
	url:'https://pypi.org/project/easyTDV/',
	//url: // Your website https URL final
	baseUrl: '/', 
	toto:"using Amazon web services", 
	// Used for publishing and more
	projectName: 'easyTDV',
	organizationName: 'ESGI',

	// For no header links in the top nav bar -> headerLinks: [],
	headerLinks: [{
		doc: 'index',
		label: 'Docs',
	}, {
		href: 'https://pypi.org/project/easyTDV/',
		label: 'PyPI'
	}, {
		href: 'https://github.com/hadjali417/PA',
		label: 'GitHub'
	}],

	/* path to images for header/footer */
	headerIcon: 'img/logo2.png',
	footerIcon: 'img/logo2.png',
	favicon: 'img/logo1.png',

	/* Colors for website */
	colors: {
		primaryColor: '#005F40',
		secondaryColor: '#005F9F',
	},

	/* Custom fonts for website */
	/*
	fonts: {
		myFont: [
			"Times New Roman",
			"Serif"
		],
		myOtherFont: [
			"-apple-system",
			"system-ui"
		]
	},
	*/

	// This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
	copyright: `Copyright © 2021 - ${new Date().getFullYear()} Amine BALEH | Laziz SEDDIKI
	| Lounas HADJ ALI`,

	highlight: {
		// Highlight.js theme to use for syntax highlighting in code blocks.
		theme: 'foundation',
	},

	// Add custom scripts here that would be placed in <script> tags.
	scripts: [
		'https://buttons.github.io/buttons.js'
	],

	// On page navigation for the current documentation page.
	onPageNav: 'separate',
	// No .html extensions for paths.
	cleanUrl: true,

	// Google Analytics configuration.
	gaTrackingId: 'UA-136434169-1',
	gaGtag: true,

	// Open Graph card image.
	ogImage: 'img/logo1.png',

	// Show documentation's last contributor's name.
	// enableUpdateBy: true,

	// Show documentation's last update time.
	// enableUpdateTime: true,

	// You may provide arbitrary config keys to be used as needed by your
	// template. For example, if you need your repo's URL...
	repoUrl: 'https://github.com/hadjali417/PA',

	disableHeaderTitle: true
};