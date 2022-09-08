import { useEffect, useRef, useState } from "react";

const useDebounce = <T>(timeout: number, defaultValue?: T) => {
    const [immediateValue, setImmediateValue] = useState(defaultValue);
    const [value, setValue] = useState(defaultValue);
    const timerRef = useRef(timeout);
    const update = (newValue: T) => {
        setImmediateValue(newValue);
        timerRef.current = timeout;
    }

    useEffect(() => {
        setTimeout(() => {
            setValue(immediateValue)
        }, timerRef.current)
    }, [timerRef.current, immediateValue]);

    return {
        value,
        update,
        immediateValue,
    }
}

export default useDebounce;