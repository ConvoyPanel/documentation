<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: '/assets/images/eric-wang.png',
    name: 'Eric Wang',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/ericwang401' }
    ]
  },
  {
    avatar: '/assets/images/anush-k.png',
    name: 'Anush K',
    title: 'Former Developer',
    links: [
      { icon: 'github', link: 'https://github.com/AnushK-Fro' }
    ]
  },
]
</script>

# About

## Core Project Team

<VPTeamMembers size="small" :members="members" />

## Community Team

Convoy wouldn't be the same without our community contributing to development, so thank you all for putting in the time
and effort in pushing Convoy forward!

### Documentation Committee

| Name          | Discord Name     |
|:--------------|------------------|
| AmazonAlexa   | amazonalexa.     |
| CorporalDuntz | corporalduntz    |

## Acknowledgements

These organizations and individuals helped support Convoy's development.

| Name                                           |                                                                                                                      |
|------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| [Advin Services LLC](https://advinservers.com) | Donated several development servers to support early development when there were little development resources.       |
| Kjartann                                       | Donated $250 during early development                                                                                |
| [HeavyNode](https://heavynode.com)             | Assisted in the development of [Convoy terminal](https://github.com/convoypanel/coterm) and helped make it possible. |
| [Pterodactyl Panel](https://pterodactyl.io)    | Served as an example for project structure and provided plenty of early inspiration.                                 |

## License

Convoy&reg; Copyright &copy; 2020-2023 Eric Wang and Performave

The panel source code is available under the [Business Source License](https://mariadb.com/bsl-faq-mariadb/). This
license doesn't mean Convoy is open-source as open-source implies freedom of usage, modification, and distribution.
However, Convoy places certain limits on usage, which are explained further on
the [licensing page](/docs/project/licensing).


