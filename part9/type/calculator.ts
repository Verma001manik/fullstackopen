type Operation = 'multiply' | 'add' | 'divide';

export const calculator = (a:number, b:number, op:Operation): number | string =>{
    if (op =='multiply'){
        return a*b;

    }
    else if (op== 'add'){
        return a+b;
    }
    else{
        return a/b;
    }
}
console.log(calculator(2,4,"multiply"));
console.log(calculator(2,4,"divide"));
console.log(calculator(2,4,"add"));