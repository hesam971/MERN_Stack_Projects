import React from 'react'
import { Accordion as TremorAccordion, AccordionBody, AccordionHeader, AccordionList } from '@tremor/react';

function Accordion() {
  return (
    <div>
        <AccordionList>
              <TremorAccordion>
                <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">Accordion 1</AccordionHeader>
                <AccordionBody className="leading-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
                  tempor lorem non est congue blandit. Praesent non lorem sodales,
                  suscipit est sed, hendrerit dolor.
                </AccordionBody>
              </TremorAccordion>
              <TremorAccordion>
                <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">Accordion 2</AccordionHeader>
                <AccordionBody className="leading-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
                  tempor lorem non est congue blandit. Praesent non lorem sodales,
                  suscipit est sed, hendrerit dolor.
                </AccordionBody>
              </TremorAccordion>
              <TremorAccordion>
                <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">Accordion 3</AccordionHeader>
                <AccordionBody className="leading-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
                  tempor lorem non est congue blandit. Praesent non lorem sodales,
                  suscipit est sed, hendrerit dolor.
                </AccordionBody>
              </TremorAccordion>
        </AccordionList>
    </div>
  )
}

export default Accordion