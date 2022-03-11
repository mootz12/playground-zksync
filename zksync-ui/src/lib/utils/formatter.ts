export function address(address: string) {
	return `${address.substring(0, 5)}...${address.slice(-4)}`;
}
