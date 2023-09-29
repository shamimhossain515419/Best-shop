import React from 'react';
import { FcGoogle } from 'react-icons/fc'
import { AiOutlineTwitter } from 'react-icons/ai'
import { BsFacebook, BsInstagram } from 'react-icons/bs'
import Link from 'next/link';
const Footer = () => {
     return (
          <div>
               <footer className="relative bg-[#F3F4F6] pt-8 pb-6">
                    <div className="container mx-auto px-4">
                         <div className="flex flex-wrap text-left lg:text-left">
                              <div className="w-full lg:w-6/12 px-4">
                                   <h4 className="text-3xl fonat-semibold text-[#27895C]">Best Shop community  </h4>
                                   <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
                                        685 Market Street
                                        San Francisco, CA 94105,
                                        United States
                                   </h5>
                                   <div className="mt-6 lg:mb-0 mb-6 flex items-center gap-3">
                                        <Link href={'/'} className="bg-white  shadow-lg  flex  h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" >
                                             <FcGoogle size={28}></FcGoogle></Link>
                                        <Link href={'/'} className="bg-white  shadow-lg  flex  h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" >
                                             <BsFacebook size={28}></BsFacebook></Link>
                                        <Link href={'/'} className="bg-white text-pink-400 shadow-lg  flex  h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" >
                                             <BsInstagram size={28}></BsInstagram></Link>
                                        <Link href={'/'} className="bg-white  shadow-lg  flex  h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" >
                                             <AiOutlineTwitter size={28}></AiOutlineTwitter>
                                        </Link>
                                   </div>
                              </div>
                              <div className="w-full lg:w-6/12 px-4">
                                   <div className="flex flex-wrap items-top mb-6">
                                        <div className="w-full lg:w-4/12 px-4 ml-auto">
                                             <span className="block uppercase text-blueGray-500 text-xl font-semibold mb-2">Information</span>
                                             <ul className="list-unstyled">
                                                  <li>
                                                       <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://www.creative-tim.com/presentation?ref=njs-profile">About Us</a>
                                                  </li>
                                                  <li>
                                                       <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://blog.creative-tim.com?ref=njs-profile">Blog</a>
                                                  </li>
                                                  <li>
                                                       <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://www.github.com/creativetimofficial?ref=njs-profile">Github</a>
                                                  </li>
                                                  <li>
                                                       <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://www.creative-tim.com/bootstrap-themes/free?ref=njs-profile">Free Products</a>
                                                  </li>
                                             </ul>
                                        </div>
                                        <div className="w-full lg:w-4/12 px-4">
                                             <span className="block uppercase text-blueGray-500 text-xl font-semibold mb-2">Other Resources</span>
                                             <ul className="list-unstyled">
                                                  <li>
                                                       <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://github.com/creativetimofficial/notus-js/blob/main/LICENSE.md?ref=njs-profile">Best shop</a>
                                                  </li>
                                                  <li>
                                                       <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://creative-tim.com/terms?ref=njs-profile">Terms &amp; Conditions</a>
                                                  </li>
                                                  <li>
                                                       <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://creative-tim.com/privacy?ref=njs-profile">Privacy Policy</a>
                                                  </li>
                                                  <li>
                                                       <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://creative-tim.com/contact-us?ref=njs-profile">Contact Us</a>
                                                  </li>
                                             </ul>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <hr className="my-6 border-blueGray-300" />
                         <div className="flex flex-wrap items-center md:justify-between justify-center">
                              <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                                   <div className="text-sm text-blueGray-500 font-semibold py-1">
                                        Copyright © <span id="get-current-year">2023</span><a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank" />Best shop
                                        <a href="https://www.creative-tim.com?ref=njs-profile" className="text-blueGray-500 hover:text-blueGray-800"> Creative Tim</a>.
                                   </div>
                              </div>
                         </div>
                    </div>
               </footer>
          </div>
     );
};

export default Footer;