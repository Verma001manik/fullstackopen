
interface TotalProps {
  courseParts: {
    name: string;
    exerciseCount: number;
  }[];
}

const Total = (props: TotalProps): JSX.Element => {
  const totalExercises = props.courseParts.reduce(
    (carry, part) => carry + part.exerciseCount,
    0
  );

  return (
    <div>
      Total number of exercises: {totalExercises}
    </div>
  );
};

export default Total;
