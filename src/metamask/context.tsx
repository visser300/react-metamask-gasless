import React, { useEffect } from "react";

type Values = {
  user: User;
  setUser: (values: any) => void;
  contract: any;
  setContract: (values: any) => void;
};

const initialValues: Values = {
	contract: {},
	setContract: () => {},
	user: {
		address: "",
		isConnected: false,
		balance: 0,
	},
	setUser: () => {},
};

const MetamaskContext = React.createContext<Values>(initialValues);

const MetamaskProvider = ({ children }: any) => {
  const [contract, setContract] = React.useState<any>();
  const [user, setUser] = React.useState<User>({
		address: window.ethereum.selectedAddress,
		isConnected: false,
		balance: 0,
	});
  const values: Values = { user, setUser, contract, setContract };

  return (
    <MetamaskContext.Provider value={values}>
      {children}
    </MetamaskContext.Provider>
  );
};

export { MetamaskProvider, MetamaskContext };
