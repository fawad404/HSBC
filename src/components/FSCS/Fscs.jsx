import React from 'react'
import FCSSvg from '../../assets/fcs.svg'
const Fscs = () => {
    return (
        <div className="mt-8 pt-8 border-t">
            <div className='flex space-x-4'>
                <img
                    src={FCSSvg}
                    alt="FSCS Logo"
                    width={50}
                    height={50}
                    className="mb-4"
                />
                <p className="text-xs">
                    For further information on the compensation provided by the UK Financial Services Compensation Scheme (FSCS), please visit the{' '}
                    <a href="#" className="text-gray-800 hover:underline  items-center inline-block">
                        FSCS website
                        <svg class="Box-sc-y5ctq9-0 SvgIcon__SvgIconBox-sc-1vnlbss-0 iRtCNb bFJcHO SvgIcon" className='h-4 w-4 inline-block ml-2' focusable="false" viewBox="0 0 18 18" aria-labelledby="title-icon-1734699544522-16 " role="img" data-testid="NewModalIcon" data-id="Icon" aria-hidden="false" fill="currentColor"><title id="title-icon-1734699544522-16">Channel Islands and Isle of Man depositor compensation scheme website (opens in new window)</title><path fill="none" d="M0 0h18v18H0z" opacity=".25"></path><path d="M11.8 15.8H2.2V6.2h2.6V5H1v12h12v-3.8h-1.2v2.6zm4-5H7.2V2.2H10V1H6v11h11V8h-1.2v2.8zm-4.34-3.412l4.34-4.34v3.808l1.2-1.2V1h-4.657l-1.199 1.199h3.809L10.612 6.54l.848.848z"></path></svg>

                    </a>
                </p>
            </div>
            <p className="text-xs mt-2">
                Deposits held in the Channel Islands and Isle of Man are not covered by the UK FSCS. For more information, visit the{' '}
                <a href="https://www.business.ciiom.hsbc.com/en-gb/regulations/legal-information" className="text-gray-800 hover:underline items-center">
                    Channel Islands and Isle of Man depositor compensation scheme website
                    <svg class="Box-sc-y5ctq9-0 SvgIcon__SvgIconBox-sc-1vnlbss-0 iRtCNb bFJcHO SvgIcon" className='h-4 w-4 inline-block ml-2' focusable="false" viewBox="0 0 18 18" aria-labelledby="title-icon-1734699544522-16 " role="img" data-testid="NewModalIcon" data-id="Icon" aria-hidden="false" fill="currentColor"><title id="title-icon-1734699544522-16">Channel Islands and Isle of Man depositor compensation scheme website (opens in new window)</title><path fill="none" d="M0 0h18v18H0z" opacity=".25"></path><path d="M11.8 15.8H2.2V6.2h2.6V5H1v12h12v-3.8h-1.2v2.6zm4-5H7.2V2.2H10V1H6v11h11V8h-1.2v2.8zm-4.34-3.412l4.34-4.34v3.808l1.2-1.2V1h-4.657l-1.199 1.199h3.809L10.612 6.54l.848.848z"></path></svg>
                </a>
            </p>
        </div>
    )
}

export default Fscs
