export default {
	title: 'Convoy',
	themeConfig: {
		sidebar: [
			{
				text: 'Deployment',
				items: [
					{ text: 'Introduction', link: '/guide/deployment/' },
					{ text: 'NoVNC Service', link: '/guide/deployment/configuring-novnc' },
				]
			},
			{
				text: 'Application API',
				items: [
					{ text: 'Introduction', link: '/guide/application-api/' },
					{ text: 'Users', link: '/guide/application-api/users' },
					{ text: 'Servers', link: '/guide/application-api/servers' },
					{ text: 'Locations', link: '/guide/application-api/locations' },
					{ text: 'Nodes', link: '/guide/application-api/nodes' },
					{ text: 'Templates', link: '/guide/application-api/templates' },
					{ text: 'Addresses', link: '/guide/application-api/addresses' },
					{ text: 'Single Sign On', link: '/guide/application-api/single-sign-on' },
				]
			}
		]
	}
}
