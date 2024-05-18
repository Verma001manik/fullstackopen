interface HeightWeight {
    height: number;
    weight: number;
}

const parseArgument = (args: string[]): HeightWeight => {
    if (args.length !== 4) throw new Error('Invalid number of arguments');

    const height = Number(args[2]);
    const weight = Number(args[3]);

    if (isNaN(height) || isNaN(weight)) {
        throw new Error('Provided values were not numbers!');
    }

    return {
        height,
        weight,
    };
};

export const calculateBmi = (height: number, weight: number): string => {
    const result = weight / (Math.pow(height / 100, 2)); // Convert height to meters

    if (result < 18.5) {
        return 'Underweight';
    } else if (result >= 18.5 && result < 24.9) {
        return 'Normal (healthy weight)';
    } else if (result >= 25 && result < 30) {
        return 'Overweight';
    } else {
        return 'Obese';
    }
};

try {
    const { height, weight } = parseArgument(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}
