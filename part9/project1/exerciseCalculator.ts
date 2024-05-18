interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: String,
    target: number,
    average: number 
}

const calculateExercises = (exerciceHours: Array<number>,target: number ): Result=>{
    let sumOfObservations = 0 ;
    const noOfObservations = exerciceHours.length;
 
    let success: boolean = false;


    let traindays = 0 ;
    let rating = 0;
    let ratingDescription = '';


    exerciceHours.forEach(hour =>{
        sumOfObservations += hour;
        if(hour>0){
            traindays += 1;

        }

    })
    


    const average = sumOfObservations/noOfObservations;
    if(target>average){
        rating = 3;
        ratingDescription = "Very good!!";
        success = true;


        
    }else if(target == average){
        rating = 2 ;
        ratingDescription = "Good";
        success = false;


    }
    else{
        rating = 1 ;
        ratingDescription = "Can be improved";
        success = false;

    }

    return {
        periodLength: 7,
        trainingDays: traindays,
        success: success,
        rating : rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    }



}
console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
