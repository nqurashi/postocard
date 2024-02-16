import React from 'react'
import Hero from './Hero/Hero'
import Section1 from './Sections/Section1'
import Section2 from './Sections/Section2'
import Section3 from './Sections/Section3'
import Sectoion4 from './Sections/Sectoion4'
import Packages from './Sections/Packages'

const Index = () => {
    return (
        <>
            <Hero />
            <Section1 />
            <Section2 />
            <Section3 />
            <Packages/>
            {/* <Sectoion4 /> */}
        </>
    )
}

export default Index