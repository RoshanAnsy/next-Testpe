"use client"

import React, { useState, useEffect, useRef } from 'react';
import { ViewQuestion } from '@/type/types';
import Image from 'next/image';
import { Button } from '../ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { TiDelete } from "react-icons/ti";
import { BiExitFullscreen } from "react-icons/bi";

interface ViewPepperProps {
  question: ViewQuestion; // Accept the selected question
  onClose: () => void; // Accept the close function
}

const ViewPepper: React.FC<ViewPepperProps> = ({ question, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [touchDistance, setTouchDistance] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  console.log("this is a full screen", question);
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    console.log("this is touchstart event", e);
    if (e.touches.length === 2 && isFullScreen) {
      const distance = getDistance(e.touches as unknown as TouchList);
      setTouchDistance(distance);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    console.log("this is handleTouchMove data", e, touchDistance);
    if (e.touches.length === 2 && touchDistance && isFullScreen) {
      const newDistance = getDistance(e.touches as unknown as TouchList);
      const scaleFactor = newDistance / touchDistance;
      setZoomLevel((prevZoom) => Math.min(Math.max(prevZoom * scaleFactor, 1), 3));    // Min zoom 1, max zoom 3
      setTouchDistance(newDistance);
    }
  };

  const getDistance = (touches: TouchList): number => {
    const touch1 = touches[0];
    const touch2 = touches[1];

    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;

    return Math.sqrt(dx * dx + dy * dy);
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (question?.images && question.images.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % question.images.length);
    }
  };

  const handlePrevious = () => {
    if (question?.images && question.images.length > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? question.images.length - 1 : prevIndex - 1
      );
    }
  };

  const handleFullScreen = () => {
    const imageElement = document.getElementById('currentImage');
    if (imageElement?.requestFullscreen) {
      imageElement.requestFullscreen();
    }
  };

  const handleExitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  // Detect if the document is in fullscreen mode
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  return (
    <div className="relative max-w-2xl sm:mx-auto sm:p-6 rounded-lg max-h-screen">
      {/* Close Button */}
      {!isFullScreen && (
        <TiDelete onClick={onClose} size={30} className='hover:text-red-700 absolute top-0 right-0 sm:top-2 sm:right-2 '/>
      )}

      <h2 className={`text-sm sm:text-lg  mb-4 uppercase ${isFullScreen ? 'hidden' : ''}`}>
        <span className='font-semibold '>Subject :</span> {question?.subject}
      </h2>
      <div className={`grid grid-cols-2 uppercase gap-4 text-sm ${isFullScreen ? 'hidden' : ''}`}>
        <div>
          <p><strong>Board:</strong> {question?.bord}</p>
          <p><strong>Year:</strong> {question?.year}</p>
        </div>
        <div>
          <p><strong>Semester:</strong> {question?.semester}</p>
          <p><strong>Branch:</strong> {question?.branch}</p>
        </div>
      </div>

      {/* Image Section */}
      <div
        className={`relative my-6 flex justify-center ${isFullScreen ? 'w-full h-screen bg-black' : ''}`}
        ref={containerRef}
        onTouchStart={isFullScreen ? handleTouchStart : undefined}
        onTouchMove={isFullScreen ? handleTouchMove : undefined}
        style={{
          transform: isFullScreen ? `scale(${zoomLevel})` : 'scale(1)',
          transition: 'transform 0.1s ease',
        }}
      >
        {question?.images && question.images.length > 0 ? (
          <>
            <Image
              id="currentImage"
              src={question.images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className={`max-w-full max-h-72 rounded-lg object-contain ${isFullScreen ? 'h-full w-auto' : 'border'}`}
              layout="responsive"
              width={16}
              height={9}
            />


            {/* Full Screen Exit Button (only in full screen mode) */}
            {isFullScreen && (
              <Button
                onClick={handleExitFullScreen}
                className="absolute bottom-4 right-4 text-[10px] sm:text-sm font-time  px-4 py-2  "
              >
                Exit Full Screen
              </Button>
            )}
          </>
        ) : (
          <p>No images available</p>
        )}
      </div>

      {/* Full Screen Button (shown only when not in full screen mode) */}
      <div className='flex flex-row  justify-center items-center text-center absolute bottom-0 '>
        <Pagination className='cursor-pointer'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={handlePrevious} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink >{currentIndex + 1}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={handleNext} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <div className='flex flex-row  justify-center items-center text-center absolute bottom-0 right-0 sm:right-5'>
        {!isFullScreen && (
          <Button variant="secondary" onClick={handleFullScreen}>
            <BiExitFullscreen className=' hover:scale-125' />
          </Button>
        )}
      </div>

    </div>

  );
};

export default ViewPepper;
