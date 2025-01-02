import { useContext, useEffect, useState } from 'react'
import CourseContext from './CourseContext'
import Swal from "sweetalert2";
import PropTypes from 'prop-types'
import UserContext from './UserContext';
 
export default function CourseProvider({ children }) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { signUser } = useContext(UserContext)
    const [courseCounting, setCourseCounting] = useState("")
    const [allCourse, setAllCourse] = useState([])
    const [courseCategory, setCourseCategory] = useState([])
    const [getCourse, setGetCourse] = useState([])
    const [category, setCategory] = useState([])
    const [uniqueCourseCategory, setUniqueCourseCategory] = useState([])
    const [checCourse, setChecCourse] = useState()
    const [checCategory, setChecCategory] = useState()
    const [getCourseCat, setGetCourseCat] = useState([])

    const allCourses = async () => {
        try {
            const res = await fetch(`${apiUrl}/api/course/getAllCourses`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Failed to fetch courses");
            }

            setAllCourse(data);
            const uniqueCategories = new Map();

            data.forEach((post) => {
                if (post.categoryId) {
                    uniqueCategories.set(post.categoryId._id, post.categoryId);
                }
            });
            const uniqueCategoriesArray = Array.from(uniqueCategories.values());
            console.log(uniqueCategoriesArray);
            setUniqueCourseCategory(uniqueCategoriesArray);

            if (uniqueCategoriesArray.length > 0 && courseCategory.length > 0) {
                setCourseCategory(courseCategory);
            } else if (uniqueCategoriesArray.length > 0) {
                setCourseCategory(uniqueCategoriesArray[0].category);
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };


    const CourseById = async (id) => {
        await fetch(`${apiUrl}/api/course/getcourse/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                setGetCourseCat(data.categoryy)
                setGetCourse(data.courseId)
            })
    }
    const checkCourse = async () => {
        if (!signUser || !signUser._id) {
            return;
        }
        const res = await fetch(`${apiUrl}/api/course/checkCourse/${signUser._id}`, {
            method: "GET",
        })
        const data = await res.json()
        setChecCategory(data.categoryy)
        setChecCourse(data.courseId)
    }


    // Delete Course
    const deleteCourse = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your course has been deleted successfully.",
                    icon: "success",
                });
            }
            return result;
        });

        if (isConfirmed) {
            await fetch(
                `${apiUrl}/api/course/deletecourse/${id}`,
                {
                    method: "delete",
                }
            );
            allCourses();
            checkCourse()
        }
    };

    const getOnlyCategory = async () => {
        const res = await fetch(`${apiUrl}/api/course/getOnlyCategory`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        setCategory(data)
    }


    const courseCount = async () => {
        const res = await fetch(`${apiUrl}/api/course/countCourse`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        setCourseCounting(data)
    }

    useEffect(() => {
        if (signUser && signUser._id) {
            checkCourse();
        }
        allCourses()
        checkCourse()
        getOnlyCategory()
        courseCount()
    }, [signUser])

    return (
        <CourseContext.Provider value={{ allCourse, getCourse, getCourseCat, allCourses, CourseById, deleteCourse, checCategory, category, checCourse, setGetCourse, checkCourse, courseCategory, setCourseCategory, uniqueCourseCategory, courseCounting }}>
            {children}
        </CourseContext.Provider>
    )
}

CourseProvider.propTypes = {
    children: PropTypes.node.isRequired
}