import * as HelloContract from './Greeter.json';

export interface ContractDetails {
	address: string;
	abi: object[];
}

export const HELLO_CONTRACT: ContractDetails = {
	address: '0xa3B1A0b739811C14c856D4c42Eda9e40B64A7140',
	abi: HelloContract.abi
};
