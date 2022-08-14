export default {
	title: 'Convoy',
	themeConfig: {
		sidebar: [
			{
				text: 'Deployment',
				items: [
					{ text: 'Introduction', link: '/guide/deployment/' },
				]
			},
			{
				text: 'External API',
				items: [
					{ text: 'Introduction', link: '/guide/external-api/' },
					{ text: 'Users', link: '/guide/external-api/users' },
					{ text: 'Servers', link: '/guide/external-api/servers' },
					{ text: 'Nodes', link: '/guide/external-api/nodes' },
					{ text: 'Templates', link: '/guide/external-api/templates' },
					{ text: 'Addresses', link: '/guide/external-api/addresses' },
					{ text: 'Single Sign On', link: '/guide/external-api/single-sign-on' },
				]
			}
		]
	}
}
