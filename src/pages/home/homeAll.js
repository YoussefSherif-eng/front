
import { getAuthUser } from "../../helper/storage";
import "../../css/HomeAll.css"

const HomeAll = () => {
    const auth = getAuthUser();

    console.log(auth);

    return (
        <>
            {auth && (
                <>
                <img src="./undraw_remotely_2j6y.svg" alt="" class="imge" />
                    <h2>Hello {auth.name} </h2>
                </>
            )}
            {!auth && (
                <body>
                <img src="./undraw_remotely_2j6y.svg" alt="" class="imge" />
                    <h2>Job Connect website</h2>
                    <ul class="pra">
                        <li>The College's Software Engineering program has been established since 2006 and is offered by the Informat Systems Department.</li>
                        <br/>
                            <li>The study system in the program and in all departments of the college depends on the credit hours.</li>
                            <br/>
                                <li>The number of credit hours in the program is 129 credit hours divided into eight semesters.</li>
                                <br/>
                                    <li>A program with expenses of up to seven thousand Egyptian pounds per year.</li>
                                    <br/>
                                        <li>Credit hours must be passed successfully to obtain a Bachelor's degree in Computers and Information - Software Engineering major.</li>
                                        <br/>
                                            <li>Job Title: Software Engineer or Software Quality and Production Engineer.</li>
                                            <br/>
                                                <li>The department has independent student affairs.</li>
                                            </ul>

                                        </body>
            )}



                                    </>
                                    );
};

                                    export default HomeAll;