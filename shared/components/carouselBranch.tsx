"use client";

import React, { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/shared/components/ui/carousel";
import { getBranches } from "@/api/branch.api";
import { getFields } from "@/api/field.api";

export default function CarouselBranch() {
  const [branches, setBranches] = useState<any[]>([]);
  const [fields, setFields] = useState<any[]>([]);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const fieldData = await getFields();
        setFields(fieldData);
        console.log("Branch data:", fieldData);
      } catch (error) {
        console.error("Error fetching field data:", error);
      }
    };
    const fetchBranches = async () => {
      try {
        const branchData = await getBranches();
        setBranches(branchData);
        console.log("Branch data:", branchData);
      } catch (error) {
        console.error("Error fetching branch data:", error);
      }
    };

    fetchFields();
    fetchBranches();
  }, []);

  return (
    <Carousel className="w-[80%] h-auto bg-white rounded-lg shadow-lg p-2 gap-[20px]">
      <CarouselContent>
        {branches.map((branch, index) => (
          <CarouselItem key={index}>
            <div className="flex flex-row p-1 gap-[15px]">
              <div className="flex flex-col justify-between items-start w-[60%] h-[500px] bg-gray-100 rounded-lg shadow-lg p-4">
                <div className="flex flex-col items-start mb-4">
                  <h2 className="text-[45px] text-black font-bold mb-0">
                    {branch.name}
                  </h2>
                  <span className="text-[15px]">{branch.location}</span>
                </div>
                <div className="flex flex-row items-start gap-2.5 mb-4 w-full overflow-clip">
                  <div className="flex flex-row bg-white items-center mb-2 p-2 rounded-lg gap-[10px]">
                    <svg
                      className="h-5 w-5 text-sky-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12 21q-1.05 0-1.775-.725T9.5 18.5t.725-1.775T12 16t1.775.725t.725 1.775t-.725 1.775T12 21m-5.65-5.65l-2.1-2.15q1.475-1.475 3.463-2.337T12 10t4.288.875t3.462 2.375l-2.1 2.1q-1.1-1.1-2.55-1.725T12 13t-3.1.625t-2.55 1.725M2.1 11.1L0 9q2.3-2.35 5.375-3.675T12 4t6.625 1.325T24 9l-2.1 2.1q-1.925-1.925-4.462-3.012T12 7T6.563 8.088T2.1 11.1"
                      />
                    </svg>
                    <span className="text-[15px] text-black font-bold">
                      WiFi
                    </span>
                  </div>
                  <div className="flex flex-row bg-white items-center mb-2 p-2 rounded-lg gap-[10px]">
                    <svg
                      className="h-5 w-5 text-sky-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M6 21V3h7q2.5 0 4.25 1.75T19 9t-1.75 4.25T13 15h-3v6zm4-10h3.2q.825 0 1.413-.587T15.2 9t-.587-1.412T13.2 7H10z"
                      />
                    </svg>
                    <span className="text-[15px] text-black font-bold">
                      Parkir
                    </span>
                  </div>
                  <div className="flex flex-row bg-white items-center mb-2 p-2 rounded-lg gap-[10px]">
                    <svg
                      className="h-5 w-5 text-sky-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M10 18h1v-4q.625 0 1.063-.437T12.5 12.5v-3h-1v3H11v-3h-1v3h-.5v-3h-1v3q0 .625.438 1.063T10 14zm4 0h1V9.5q-.825 0-1.412.588T13 11.5v3h1zM4 21V9l8-6l8 6v12zm2-2h12v-9l-6-4.5L6 10zm6-6.75"
                      />
                    </svg>
                    <span className="text-[15px] text-black font-bold">
                      Parkir
                    </span>
                  </div>
                  <div className="flex flex-row bg-white items-center mb-2 p-2 rounded-lg gap-[10px]">
                    <svg
                      className="h-5 w-5 text-sky-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12 21q-1.05 0-1.775-.725T9.5 18.5t.725-1.775T12 16t1.775.725t.725 1.775t-.725 1.775T12 21m-5.65-5.65l-2.1-2.15q1.475-1.475 3.463-2.337T12 10t4.288.875t3.462 2.375l-2.1 2.1q-1.1-1.1-2.55-1.725T12 13t-3.1.625t-2.55 1.725M2.1 11.1L0 9q2.3-2.35 5.375-3.675T12 4t6.625 1.325T24 9l-2.1 2.1q-1.925-1.925-4.462-3.012T12 7T6.563 8.088T2.1 11.1"
                      />
                    </svg>
                    <span className="text-[15px] text-black font-bold">
                      WiFi
                    </span>
                  </div>
                  <div className="flex flex-row bg-white items-center mb-2 p-2 rounded-lg gap-[10px]">
                    <svg
                      className="h-5 w-5 text-sky-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M6 21V3h7q2.5 0 4.25 1.75T19 9t-1.75 4.25T13 15h-3v6zm4-10h3.2q.825 0 1.413-.587T15.2 9t-.587-1.412T13.2 7H10z"
                      />
                    </svg>
                    <span className="text-[15px] text-black font-bold">
                      Parkir
                    </span>
                  </div>
                  <div className="flex flex-row bg-white items-center mb-2 p-2 rounded-lg gap-[10px]">
                    <svg
                      className="h-5 w-5 text-sky-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M10 18h1v-4q.625 0 1.063-.437T12.5 12.5v-3h-1v3H11v-3h-1v3h-.5v-3h-1v3q0 .625.438 1.063T10 14zm4 0h1V9.5q-.825 0-1.412.588T13 11.5v3h1zM4 21V9l8-6l8 6v12zm2-2h12v-9l-6-4.5L6 10zm6-6.75"
                      />
                    </svg>
                    <span className="text-[15px] text-black font-bold">
                      Parkir
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-start mb-4">
                  <h2 className="text-[24px] text-black font-bold mb-0">
                    Jam Operasional
                  </h2>
                  <span className="text-[15px]">Senin - Minggu</span>
                  <span className="text-[15px]">08:00 - 22:00</span>
                </div>
                <div className="flex flex-col items-start mb-4">
                  <h2 className="text-[24px] text-black font-bold mb-0">
                    Lapangan
                  </h2>
                  {fields.map(
                    (field, fi) =>
                      field.branchId === branch.id && (
                        <span className="text-[20px] flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                          >
                            <g fill="none">
                              <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
                              <path
                                fill="currentColor"
                                d="m12 13.414l1.458 1.458A8 8 0 0 0 12.091 22a9.97 9.97 0 0 1-6.138-2.034l-.282-.223zm2.887 2.887l3.442 3.442a9.94 9.94 0 0 1-4.21 2.031a6.01 6.01 0 0 1 .768-5.473m-5.76-5.759L10.587 12l-6.33 6.329A9.97 9.97 0 0 1 2 11.909a8 8 0 0 0 7.128-1.367Zm12.647 3.576a9.9 9.9 0 0 1-1.8 3.918l-.23.293l-3.443-3.442a6.01 6.01 0 0 1 5.473-.769m-2.03-8.447A9.97 9.97 0 0 1 22 12.09a8 8 0 0 0-6.878 1.18l-.25.187L13.414 12zM11.908 2a9.97 9.97 0 0 1 6.138 2.033l.282.223L12 10.586l-1.458-1.458A8 8 0 0 0 11.909 2ZM4.257 5.67l3.442 3.442a6.01 6.01 0 0 1-5.473.769a9.94 9.94 0 0 1 2.03-4.211Zm5.625-3.445a6.01 6.01 0 0 1-.611 5.24l-.158.233L5.67 4.257a9.94 9.94 0 0 1 4.21-2.031Z"
                              />
                            </g>
                          </svg>
                          {field.name}
                        </span>
                      )
                  )}
                  {/* <span className="text-[20px] flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none">
                        <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
                        <path
                          fill="currentColor"
                          d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m3.408 2.76l-2.82 2.049a1 1 0 0 1-1.067.069l-.109-.069l-2.82-2.049a8 8 0 0 0-2.19 1.525l-.234.239l1.077 3.313a1 1 0 0 1-.264 1.036l-.1.082l-2.819 2.048c.114.91.38 1.771.773 2.559l.153.292h3.485a1 1 0 0 1 .909.582l.042.109l1.078 3.315a8 8 0 0 0 2.63.06l.367-.06l1.077-3.315a1 1 0 0 1 .834-.684l.117-.007h3.485a8 8 0 0 0 .876-2.512l.05-.339l-2.82-2.048a1 1 0 0 1-.395-.994l.032-.124l1.077-3.313A8 8 0 0 0 15.71 4.91zm-3.996 3.431a1 1 0 0 1 1.067-.069l.109.069l2.853 2.073a1 1 0 0 1 .395.993l-.032.125l-1.09 3.354a1 1 0 0 1-.834.684l-.117.007h-3.526a1 1 0 0 1-.909-.582l-.042-.109l-1.09-3.354a1 1 0 0 1 .264-1.036l.1-.082z"
                        />
                      </g>
                    </svg>
                    Lapangan Futsal
                  </span>
                  <span className="text-[20px] flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none">
                        <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
                        <path
                          fill="currentColor"
                          d="m12 13.414l1.458 1.458A8 8 0 0 0 12.091 22a9.97 9.97 0 0 1-6.138-2.034l-.282-.223zm2.887 2.887l3.442 3.442a9.94 9.94 0 0 1-4.21 2.031a6.01 6.01 0 0 1 .768-5.473m-5.76-5.759L10.587 12l-6.33 6.329A9.97 9.97 0 0 1 2 11.909a8 8 0 0 0 7.128-1.367Zm12.647 3.576a9.9 9.9 0 0 1-1.8 3.918l-.23.293l-3.443-3.442a6.01 6.01 0 0 1 5.473-.769m-2.03-8.447A9.97 9.97 0 0 1 22 12.09a8 8 0 0 0-6.878 1.18l-.25.187L13.414 12zM11.908 2a9.97 9.97 0 0 1 6.138 2.033l.282.223L12 10.586l-1.458-1.458A8 8 0 0 0 11.909 2ZM4.257 5.67l3.442 3.442a6.01 6.01 0 0 1-5.473.769a9.94 9.94 0 0 1 2.03-4.211Zm5.625-3.445a6.01 6.01 0 0 1-.611 5.24l-.158.233L5.67 4.257a9.94 9.94 0 0 1 4.21-2.031Z"
                        />
                      </g>
                    </svg>
                    Lapangan Basket
                  </span>
                  <span className="text-[20px] flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none" fill-rule="evenodd">
                        <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
                        <path
                          fill="currentColor"
                          d="M3.905 5.707a2.774 2.774 0 0 1 4.434-3.025A2.8 2.8 0 0 1 10.179 2c.694 0 1.33.25 1.821.667A2.8 2.8 0 0 1 13.822 2c.71 0 1.35.26 1.84.682a2.774 2.774 0 0 1 4.434 3.025L16 17.173V18a4 4 0 0 1-8 0v-.827zM10 17.023V17h4v1a2 2 0 1 1-4 0zM14.653 15H9.348l-3.56-9.966a.774.774 0 1 1 1.49-.397l1.538 8.54a1 1 0 0 0 1.968-.354L9.37 4.967A.822.822 0 1 1 11 4.82V13a1 1 0 1 0 2 0V4.821a.821.821 0 1 1 1.632.137l-1.416 7.865a1 1 0 1 0 1.968.354l1.414-7.856l.003-.016l.12-.668a.774.774 0 1 1 1.49.397z"
                        />
                      </g>
                    </svg>
                    Lapangan Badminton
                  </span> */}
                </div>
                <button className="bg-skye rounded-lg px-4 py-2 w-[200px] h-[50px] text-white text-[24px] font-bold hover:bg-skye-hover transition duration-300">
                  <a href="#">Reservasi</a>
                </button>
              </div>
              <div className="justify-center items-center w-[40%] h-[500px] bg-gray-100 rounded-lg shadow-lg p-0">
                <img
                  // src="/images/image.png"
                  src={branch.imageUrl}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = '/images/image.png';
                  }}
                  alt={branch.name}
                  className="h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="bg-white text-black hover:bg-gray-200" />
      <CarouselNext className="bg-white text-black hover:bg-gray-200" />
    </Carousel>
  );
}
