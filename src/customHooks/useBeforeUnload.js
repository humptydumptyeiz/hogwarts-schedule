import { useState, useEffect, useRef } from 'react';

const useWindowUnloadEffect = fn => {
	const cb = useRef(fn); // init with fn, so that type checkers won't assume that current might be undefined
	
	// useEffect(() => {
	// 	cb.current = fn;
	// }, [fn]);
	
	useEffect(() => {
		const onUnload = (...args) => cb.current ? cb.current(...args) : () => {};
		
		window.addEventListener("beforeunload", onUnload);
		
		return () => window.removeEventListener("beforeunload", onUnload);
	}, []);
};


function withGracefulUnmount(WrappedComponent){
	return () => {
		const [mounted, setMounted] = useState(false);
		function componentGracefulUnmount(){
		
		}
	}
	
}


export  {useWindowUnloadEffect};
