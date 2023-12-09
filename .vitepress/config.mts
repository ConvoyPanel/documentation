import { defineConfig } from 'vitepress'

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
            { text: 'Home', link: '/' },
            { text: 'Community', link: 'https://discord.convoypanel.com' },
            { text: 'Github', link: 'https://github.com/convoypanel/panel' },
        ],

        sidebar: [
            {
                text: 'Examples',
                items: [
                    { text: 'Markdown Examples', link: '/markdown-examples' },
                    { text: 'Runtime API Examples', link: '/api-examples' },
                ],
            },
        ],

        search: {
            provider: 'local',
        },
    },
})
