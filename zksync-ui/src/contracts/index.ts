import * as HelloContract from './Greeter.json';

export interface ContractDetails {
	address: string;
	abi: object[];
}

export const HELLO_CONTRACT: ContractDetails = {
	// old address: '0xa3B1A0b739811C14c856D4c42Eda9e40B64A7140',
	address: '0xd6bD7F2054A3e80cF53AD2611D3e453f106c2559',
	abi: HelloContract.abi
};
