interface ContentProps{
    name: string;
    exercises: number;

}
const Content = (props: ContentProps): JSX.Element=>{
    return (
        <div>
            {props.name }: {props.exercises}
        </div>
    )
}

export default Content;
