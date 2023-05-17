import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import React from "react";
import UploadPopup from "./UploadPopup";
import Upload from "./Upload";
const filters = [
  {
    id: "color",
    name: "Language",
    options: [
      { value: "english", label: "English", checked: false },
      { value: "chinese", label: "Chinese", checked: false },
    ],
  },
  {
    id: "category",
    name: "Format",
    options: [
      { value: "pdf", label: "PDF", checked: false },
      { value: "text", label: "Text", checked: false },
      { value: "video", label: "Video", checked: true },
      { value: "picture", label: "Picture", checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function FilterBar({ onSearch, onYearRangeSelect }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [showUploadPopup, setShowUploadPopup] = useState(false);

  const [startYear, setStartYear] = useState(1986);
  const [endYear, setEndYear] = useState(2023);

  const handleYearRangeSelect = () => {
    onYearRangeSelect(startYear, endYear);
  };

  function handleUploadButtonClick() {
    console.log("uploadbuttonclick");
    setShowUploadPopup(true);
  }
  function handleClosePopup() {
    setShowUploadPopup(false);
  }
  return (
    <div className="bg-white w-full ">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <button
              type="button"
              className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleUploadButtonClick}
            >
              Upload a record
            </button>
            {showUploadPopup && <UploadPopup onClose={handleClosePopup} />}
          </section>
        </main>
      </div>
    </div>
  );
}
