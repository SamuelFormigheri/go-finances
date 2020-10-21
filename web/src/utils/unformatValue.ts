const unformatValue = (value: string): number => {
    return Number(value.replace('R$','').replace(' ','').replace('.','').replace(',','.'));
}

export default unformatValue;