import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-black text-white text-sm font-sans p-8">
    <div className=" mx-auto flex flex-wrap gap-4">
        <a href="https://www.business.hsbc.uk/en-gb/regulations/legal-information" className="hover:underline flex items-center">
            HSBC UK Customer Legal Information and Privacy Notice
        </a>
        <a href="https://www.business.hsbc.com/en-gb/regulations/hbeu-terms-and-conditions" className="hover:underline flex items-center">
            HSBC Customer Legal Information and Privacy Notice
        </a>
        <a href="https://online-banking.business.hsbc.co.uk/portalserver/hsbc/cookie-notice?isFooter=true" className="hover:underline flex items-center">
            Cookie Notice
        </a>
        <a href="https://www.hsbc.com/1/2/online-security" className="hover:underline flex items-center">
            Security
        </a>
        <a href="https://www.hsbc.com/careers" className="hover:underline flex items-center">
            Careers at HSBC
        </a>
    </div>
    <p className=" mx-auto mt-4 text-xs">
        © Copyright HSBC Group. All rights reserved. No endorsement or approval of any third parties or their advice, opinions, information, products or services is expressed or implied by any information on this Site or by any hyperlinks to or from any third party websites or pages. Your use of this website is subject to the terms and conditions governing it. Please read these terms and conditions before using the website.
    </p>
</footer>
  )
}

export default Footer
