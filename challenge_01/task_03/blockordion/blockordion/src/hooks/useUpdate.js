import {useState} from "react";

function useUpdate() {
	const [flag, setFlag] = useState(false);

	return function () {
		setFlag(!flag);
	}

}

export default useUpdate;
