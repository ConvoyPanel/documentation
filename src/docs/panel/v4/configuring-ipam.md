# Configuring IPAM

IPAM stands for IP address management and needs to be configured if your VMs within convoy need to have IP addresses.

## Compatibility
This guide only works with v4 of Convoy.

## Creating an IP Pool

Assuming you have a Node configured ([Adding a Node](https://convoypanel.com/docs/panel/v4/adding-a-node.html)), in the admin interface, select the `IPAM` tab. 
You first need to create an IP Pool. This can be done with the button on the top right. Name your pool and select all nodes that shall have access to this IP pool.

## Adding IP addresses to a pool

Once you are done with the pool, you can add IP addresses to it. Convoy supports IPv4 and IPv6 addresses. You can either add individual addresses in the `Single`-tab, or an entire IP subnet in the `Multiple`-tab of the pop-up menu.

### Single Addresses

If you want to add a single IP address, select `Single` in the address creation menu. Then, follow the following steps *(minimum required)*:
    1. select whether you have an IPv4 or IPv6 address
    2. enter the address in the `Address` field.
    3. enter the CIDR in the `CIDR` field. *(This corresponds to your subnet mask; i.e. the CIDR of `255.255.255.0` is `24` - (CIDR table)[http://www.rjsmith.com/CIDR-Table.html])*
    4. enter the gateway IP address in the `Gateway` field.
    5. press `create` to add the IP address


### Multiple Addresses

If you want to add an entire IP subnet, select `Multiple` in the address creation menu. Then, follow the following steps *(minimum required)*:
    1. select whether you have an IPv4 or IPv6 subnet.
    2. enter the starting and ending address in the `Starting Address` and `Ending Address` fields *(note: the last digit of a IPv4 starting address needs to be >0)*.
    3. enter the CIDR in the `CIDR` field. *(This corresponds to your subnet mask; i.e. the CIDR of `255.255.255.0` is `24`)*
    4. enter the gateway IP address in the `Gateway` field.
    5. press `create` to add the IP address
