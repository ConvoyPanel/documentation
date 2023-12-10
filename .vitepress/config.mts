import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Convoy',
    description:
        'A modern platform tailored for hosting providers and enthusiasts to effortlessly interact with their servers. Seamlessly wrapping around Proxmox, Convoy is easily deployable, affordable at just $6 per node per month for commercial use, and completely free for personal and non-profit endeavors.',
    head: [['link', {rel: 'icon', href: '/logo.svg'}]],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/logo.svg',
        nav: [
            {text: 'Pricing', link: '/docs/project/licensing'},
            {text: 'Documentation', link: '/docs/project/introduction'},
            {text: 'Community', link: 'https://discord.convoypanel.com'},
            {text: 'Github', link: 'https://github.com/convoypanel/panel'},
        ],

        sidebar: [
            {
                text: 'Project',
                items: [
                    {text: 'Introduction', link: '/docs/project/introduction'},
                    {text: 'About', link: '/docs/project/about'},
                    {text: 'Licensing', link: '/docs/project/licensing'},
                    {text: 'Support', link: '/docs/project/support'},
                    {text: 'Report License Abuse', link: '/docs/project/report-license-abuse'},
                    {text: 'Subscribe', link: 'https://console.convoypanel.com'},
                    {text: 'License Verification', link: 'https://console.convoypanel.com/lookup'},
                ],
            },
            {
                text: 'Panel',
                items: [
                    {text: 'Getting Started', link: '/docs/panel/getting-started'},
                    {text: 'Updating the Panel', link: '/docs/panel/updating-the-panel'},
                    {text: 'Enabling Terminal Access', link: '/docs/panel/enabling-terminal-access'},
                    {text: 'Adding a Node', link: '/docs/panel/adding-a-node'},
                    {
                        text: 'Application API', collapsed: true, items: [
                            {text: 'Getting Started', link: '/docs/panel/api/getting-started'},
                            {text: 'Locations', link: '/docs/panel/api/locations'},
                            {text: 'Nodes', link: '/docs/panel/api/nodes'},
                            {text: 'Servers', link: '/docs/panel/api/servers'},
                            {text: 'Users', link: '/docs/panel/api/users'},
                            {text: 'Templates', link: '/docs/panel/api/templates'},
                            {text: 'Single Sign On', link: '/docs/panel/api/single-sign-on'},
                        ]
                    }
                ],
            },
            {
                text: 'Miscellaneous',
                items: [
                    {text: 'Coterm', link: '/docs/misc/coterm'},
                    {text: 'Download VM Templates', link: '/docs/misc/download-vm-templates'},
                ],
            },
        ],

        editLink: {
            pattern: 'https://github.com/convoypanel/documentation/edit/master/src/:path'
        },

        footer: {
            message: 'Released under the Business Source License.',
            copyright: 'Copyright © 2020-present Eric Wang and Performave'
        },

        search: {
            provider: 'local',
        },
    },
    lastUpdated: true,
    srcDir: './src',
})
