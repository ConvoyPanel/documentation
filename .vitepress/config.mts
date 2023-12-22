import { defineConfig } from 'vitepress'
import { fileURLToPath } from 'node:url'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Convoy',
    description:
        'A modern platform tailored for hosting providers and enthusiasts to effortlessly interact with their servers. Seamlessly wrapping around Proxmox, Convoy is easily deployable, affordable at just $6 per node per month for commercial use, and completely free for personal and non-profit endeavors.',
    head: [['link', { rel: 'icon', href: '/logo.svg' }]],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/logo.svg',
        nav: [
            { text: 'Pricing', link: '/docs/project/licensing' },
            { text: 'Documentation', link: '/docs/project/introduction' },
            {
                text: 'Community',
                items: [
                    { text: 'Forum', link: 'https://github.com/ConvoyPanel/panel/discussions' },
                    { text: 'Discord', link: 'https://discord.convoypanel.com' },
                ],
            },
            { text: 'Github', link: 'https://github.com/convoypanel/panel' },
        ],

        sidebar: [
            {
                text: 'Project',
                items: [
                    { text: 'Introduction', link: '/docs/project/introduction' },
                    { text: 'About', link: '/docs/project/about' },
                    { text: 'Licensing', link: '/docs/project/licensing' },
                    {
                        text: 'Resources',
                        link: 'https://github.com/ConvoyPanel/panel/discussions/categories/resources',
                    },
                    { text: 'Support', link: '/docs/project/support' },
                    { text: 'Report License Abuse', link: '/docs/project/report-license-abuse' },
                    { text: 'Subscribe', link: 'https://console.convoypanel.com' },
                    { text: 'License Verification', link: 'https://console.convoypanel.com/lookup' },
                ],
            },
            {
                text: 'Panel',
                items: [

                    {
                        text: 'v4 (upcoming release)',
                        collapsed: true,
                        items: [
                            { text: 'Getting Started', link: '/docs/panel/v4/getting-started' },
                            { text: 'Updating the Panel', link: '/docs/panel/v4/updating-the-panel' },
                            { text: 'Enabling Terminal Access', link: '/docs/panel/v4/enabling-terminal-access' },
                            { text: 'Adding a Node', link: '/docs/panel/v4/adding-a-node' },
                            { text: 'Integrations', link: '/docs/panel/v4/integrations' },
                            {
                                text: 'Application API', collapsed: true, items: [
                                    { text: 'Getting Started', link: '/docs/panel/v4/api/getting-started' },
                                    { text: 'Locations', link: '/docs/panel/v4/api/locations' },
                                    { text: 'Nodes', link: '/docs/panel/v4/api/nodes' },
                                    { text: 'Node Addresses', link: '/docs/panel/v4/api/node-addresses' },
                                    { text: 'IPAM', link: '/docs/panel/v4/api/ipam' },
                                    { text: 'Servers', link: '/docs/panel/v4/api/servers' },
                                    { text: 'Users', link: '/docs/panel/v4/api/users' },
                                    { text: 'Templates', link: '/docs/panel/v4/api/templates' },
                                    { text: 'Single Sign On', link: '/docs/panel/v4/api/single-sign-on' },
                                ],
                            },
                        ],
                    },
                    {
                        text: 'v3',
                        collapsed: false,
                        items: [
                            { text: 'Getting Started', link: '/docs/panel/v3/getting-started' },
                            { text: 'Updating the Panel', link: '/docs/panel/v3/updating-the-panel' },
                            { text: 'Enabling Terminal Access', link: '/docs/panel/v3/enabling-terminal-access' },
                            { text: 'Adding a Node', link: '/docs/panel/v3/adding-a-node' },
                            { text: 'Integrations', link: '/docs/panel/v3/integrations' },
                            {
                                text: 'Application API', collapsed: true, items: [
                                    { text: 'Getting Started', link: '/docs/panel/v3/api/getting-started' },
                                    { text: 'Locations', link: '/docs/panel/v3/api/locations' },
                                    { text: 'Nodes', link: '/docs/panel/v3/api/nodes' },
                                    { text: 'Addresses', link: '/docs/panel/v3/api/addresses' },
                                    { text: 'Servers', link: '/docs/panel/v3/api/servers' },
                                    { text: 'Users', link: '/docs/panel/v3/api/users' },
                                    { text: 'Templates', link: '/docs/panel/v3/api/templates' },
                                    { text: 'Single Sign On', link: '/docs/panel/v3/api/single-sign-on' },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                text: 'Miscellaneous',
                items: [
                    { text: 'Coterm', link: '/docs/misc/coterm' },
                    { text: 'Download VM Templates', link: '/docs/misc/download-vm-templates' },
                ],
            },
        ],

        editLink: {
            pattern: 'https://github.com/convoypanel/documentation/edit/master/src/:path',
        },

        footer: {
            message: 'Released under the Business Source License.',
            copyright: 'Copyright © 2020-present Eric Wang and Performave',
        },

        search: {
            provider: 'local',
        },
    },
    lastUpdated: true,
    srcDir: './src',
    vite: {
        resolve: {
            alias: [
                {
                    find: /^.*\/VPSidebar\.vue$/,
                    replacement: fileURLToPath(
                        new URL('./theme/Sidebar.vue', import.meta.url),
                    ),
                },
            ],
        },
    },
})
