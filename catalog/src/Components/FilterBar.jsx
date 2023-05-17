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
            {
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>
            }
            {/* Filters */}
            <h3 className="sr-only">Categories</h3>
            <button
              type="button"
              className="block px-2 py-3"
              onClick={handleUploadButtonClick}
            >
              Upload a record
            </button>
            {showUploadPopup && <UploadPopup onClose={handleClosePopup} />}
            {/* {showUploadPopup && <Upload onClose={handleClosePopup} />} */}
            {filters.map((section) => (
              <Disclosure
                as="div"
                key={section.id}
                className="border-b border-gray-200 py-6"
              >
                {({ open }) => (
                  <>
                    <h3 className="-my-3 flow-root">
                      <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          {open ? (
                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                          ) : (
                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </h3>
                    <Disclosure.Panel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              id={`filter-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              defaultValue={option.value}
                              type="checkbox"
                              defaultChecked={option.checked}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="ml-3 text-sm text-gray-600"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
            <Disclosure
              as="div"
              /* key={section.id} */ className="border-b border-gray-200 py-6"
            >
              {({ open }) => (
                <>
                  <h3 className="-my-3 flow-root">
                    <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">Year</span>
                      <span className="ml-6 flex items-center">
                        {open ? (
                          <MinusIcon className="h-5 w-5" aria-hidden="true" />
                        ) : (
                          <PlusIcon className="h-5 w-5" aria-hidden="true" />
                        )}
                      </span>
                    </Disclosure.Button>
                  </h3>
                  <Disclosure.Panel className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="flex justify-center space-x-2">
                          <input
                            className="border border-gray-400 "
                            type="number"
                            value={startYear}
                            min={1986}
                            max={2023}
                            onChange={(e) =>
                              setStartYear(parseInt(e.target.value))
                            }
                          />
                          <span>--</span>
                          <input
                            className="border border-gray-400 "
                            type="number"
                            value={endYear}
                            min={1986}
                            max={2023}
                            onChange={(e) =>
                              setEndYear(parseInt(e.target.value))
                            }
                          />
                          <button
                            className="bg-blue-500 text-white px-1 py-1 rounded"
                            onClick={handleYearRangeSelect}
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </section>
        </main>
      </div>
    </div>
  );
}
