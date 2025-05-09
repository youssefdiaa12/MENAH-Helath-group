"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { ChevronRight, ChevronDown, X, Mail } from "lucide-react";

// Validation schema for the message form
const MessageSchema = Yup.object().shape({
  recipient: Yup.string().required("Recipient username is required"),
  message: Yup.string().required("Message is required"),
});

// Mock data for inbox and all messages
const mockInboxMessages = [
  {
    id: 1,
    from: "Heba Tarek",
    message: "Please check...",
    date: "27/04/2025",
    read: false,
  },
  {
    id: 2,
    from: "Yasmeen Essam",
    message: "Please check...",
    date: "27/04/2025",
    read: true,
  },
  {
    id: 3,
    from: "Nada Shaker",
    message: "Please check...",
    date: "27/04/2025",
    read: false,
  },
  {
    id: 4,
    from: "Nada Shaker",
    message: "Please check...",
    date: "27/04/2025",
    read: true,
  },
  {
    id: 5,
    from: "Nada Shaker",
    message: "Please check...",
    date: "27/04/2025",
    read: false,
  },
  {
    id: 6,
    from: "Nurse Mariam",
    message: "Hello, could you please approve my profile?",
    date: "27/04/2025 - 09:34 AM",
    read: false,
  },
];

const mockAllMessages = [
  {
    id: 7,
    from: "Heba Tarek",
    message: "Please check...",
    date: "27/04/2025",
    read: false,
  },
  {
    id: 8,
    from: "Yasmeen Essam",
    message: "Please check...",
    date: "27/04/2025",
    read: true,
  },
  {
    id: 9,
    from: "Nada Shaker",
    message: "Please check...",
    date: "27/04/2025",
    read: false,
  },
  {
    id: 10,
    from: "Nada Shaker",
    message: "Please check...",
    date: "27/04/2025",
    read: true,
  },
  {
    id: 11,
    from: "Nada Shaker",
    message: "Please check...",
    date: "27/04/2025",
    read: false,
  },
  {
    id: 11,
    from: "Nada Shaker",
    message: "Please check...",
    date: "27/04/2025",
    read: false,
  },

  {
    id: 11,
    from: "Nada Shaker",
    message: "Please check...",
    date: "27/04/2025",
    read: false,
  },
];

const MessagingParent = () => {
  const [inboxExpanded, setInboxExpanded] = useState(false);
  const [allMessagesExpanded, setAllMessagesExpanded] = useState(false);
  const [inboxCurrentPage, setInboxCurrentPage] = useState(1);
  const [allMessagesCurrentPage, setAllMessagesCurrentPage] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const messagesPerPage = 5;

  // Handle message submission
  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    // In a real app, you would send this to your backend
    console.log("Sending message:", values);

    // Show success message with SweetAlert
    Swal.fire({
      html: `
        <div class="flex flex-col items-center">
          <div class="bg-green-500 rounded-full p-3 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p class="text-lg font-medium">Message sent successfully.</p>
        </div>
      `,
      showConfirmButton: false,
      timer: 2000,
      customClass: {
        popup: "rounded-lg",
      },
    });

    resetForm();
    setSubmitting(false);
  };

  // Handle message view
  const handleViewMessage = (message) => {
    setSelectedMessage(message);
  };

  // Handle message delete
  const handleDeleteMessage = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // In a real app, you would delete from your backend
        console.log("Deleting message:", id);
        Swal.fire("Deleted!", "Your message has been deleted.", "success");
      }
    });
  };

  // Inbox pagination
  const indexOfLastInboxMessage = inboxCurrentPage * messagesPerPage;
  const indexOfFirstInboxMessage = indexOfLastInboxMessage - messagesPerPage;
  const currentInboxMessages = mockInboxMessages.slice(
    indexOfFirstInboxMessage,
    indexOfLastInboxMessage
  );
  const totalInboxPages = Math.ceil(mockInboxMessages.length / messagesPerPage);

  const paginateInbox = (pageNumber) => setInboxCurrentPage(pageNumber);

  // All messages pagination
  const indexOfLastAllMessage = allMessagesCurrentPage * messagesPerPage;
  const indexOfFirstAllMessage = indexOfLastAllMessage - messagesPerPage;
  const currentAllMessages = mockAllMessages.slice(
    indexOfFirstAllMessage,
    indexOfLastAllMessage
  );
  const totalAllMessagesPages = Math.ceil(
    mockAllMessages.length / messagesPerPage
  );

  const paginateAllMessages = (pageNumber) =>
    setAllMessagesCurrentPage(pageNumber);

  return (
    <div className="max-w-8xl mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Messaging Center
      </h1>

      {/* Send Message Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center mb-4">
          <div className="bg-yellow-100 p-2 rounded-md mr-2">
            <Mail className="h-5 w-5 text-yellow-500" />
          </div>
          <h2 className="text-lg font-semibold">Send a Message</h2>
        </div>

        <Formik
          initialValues={{ recipient: "", message: "" }}
          validationSchema={MessageSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  type="text"
                  name="recipient"
                  placeholder="Enter Receiver Username"
                  className={`w-full p-3 border ${
                    errors.recipient && touched.recipient
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md`}
                />
                <ErrorMessage
                  name="recipient"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  as="textarea"
                  name="message"
                  placeholder="Enter Message"
                  rows="4"
                  className={`w-full p-3 border ${
                    errors.message && touched.message
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md`}
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-12 rounded-md transition-colors w-32"
                >
                  Send
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* Inbox Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setInboxExpanded(!inboxExpanded)}
        >
          <h2 className="text-lg font-semibold">Inbox</h2>
          <button className="text-blue-500">
            {inboxExpanded ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>
        </div>

        <p className="text-gray-600 mt-1">
          This is your personal inbox. You can view messages sent directly to
          you.
        </p>

        {inboxExpanded && (
          <div className="mt-4">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-blue-500 text-white">
                    <th className="py-2 px-4 text-left">From</th>
                    <th className="py-2 px-4 text-left">Message Preview</th>
                    <th className="py-2 px-4 text-left">Date</th>
                    <th className="py-2 px-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentInboxMessages.map((msg) => (
                    <tr key={msg.id} className="border-b border-gray-200">
                      <td className="py-2 px-4">{msg.from}</td>
                      <td className="py-2 px-4">{msg.message}</td>
                      <td className="py-2 px-4">{msg.date}</td>
                      <td className="py-2 px-4 flex space-x-2">
                        <button
                          onClick={() => handleViewMessage(msg)}
                          className="bg-green-500 text-white px-3 py-1 rounded-md text-sm"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Inbox Pagination */}
            <div className="flex justify-center mt-4">
              <nav className="flex items-center">
                <button
                  onClick={() =>
                    paginateInbox(
                      inboxCurrentPage > 1 ? inboxCurrentPage - 1 : 1
                    )
                  }
                  className="px-3 py-1 bg-gray-200 rounded-l-md"
                  disabled={inboxCurrentPage === 1}
                >
                  &lt;
                </button>

                {[...Array(totalInboxPages).keys()].map((number) => (
                  <button
                    key={number + 1}
                    onClick={() => paginateInbox(number + 1)}
                    className={`px-3 py-1 ${
                      inboxCurrentPage === number + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {number + 1}
                  </button>
                ))}

                {totalInboxPages > 5 && (
                  <span className="px-3 py-1 bg-gray-200">...</span>
                )}

                {totalInboxPages > 5 && (
                  <>
                    <button
                      onClick={() => paginateInbox(9)}
                      className="px-3 py-1 bg-gray-200"
                    >
                      9
                    </button>
                    <button
                      onClick={() => paginateInbox(10)}
                      className="px-3 py-1 bg-gray-200"
                    >
                      10
                    </button>
                  </>
                )}

                <button
                  onClick={() =>
                    paginateInbox(
                      inboxCurrentPage < totalInboxPages
                        ? inboxCurrentPage + 1
                        : totalInboxPages
                    )
                  }
                  className="px-3 py-1 bg-gray-200 rounded-r-md"
                  disabled={inboxCurrentPage === totalInboxPages}
                >
                  &gt;
                </button>
              </nav>
            </div>
          </div>
        )}
      </div>

      {/* All Messages Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setAllMessagesExpanded(!allMessagesExpanded)}
        >
          <h2 className="text-lg font-semibold">All Messages</h2>
          <button className="text-blue-500">
            {allMessagesExpanded ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>
        </div>

        <p className="text-gray-600 mt-1">.....</p>

        {allMessagesExpanded && (
          <div className="mt-4">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-blue-500 text-white">
                    <th className="py-2 px-4 text-left">From</th>
                    <th className="py-2 px-4 text-left">Message Preview</th>
                    <th className="py-2 px-4 text-left">Date</th>
                    <th className="py-2 px-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentAllMessages.map((msg) => (
                    <tr key={msg.id} className="border-b border-gray-200">
                      <td className="py-2 px-4">{msg.from}</td>
                      <td className="py-2 px-4">{msg.message}</td>
                      <td className="py-2 px-4">{msg.date}</td>
                      <td className="py-2 px-4 flex space-x-2">
                        <button
                          onClick={() => handleViewMessage(msg)}
                          className="bg-green-500 text-white px-3 py-1 rounded-md text-sm"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* All Messages Pagination */}
            <div className="flex justify-center mt-4">
              <nav className="flex items-center">
                <button
                  onClick={() =>
                    paginateAllMessages(
                      allMessagesCurrentPage > 1
                        ? allMessagesCurrentPage - 1
                        : 1
                    )
                  }
                  className="px-3 py-1 bg-gray-200 rounded-l-md"
                  disabled={allMessagesCurrentPage === 1}
                >
                  &lt;
                </button>

                {[...Array(totalAllMessagesPages).keys()].map((number) => (
                  <button
                    key={number + 1}
                    onClick={() => paginateAllMessages(number + 1)}
                    className={`px-3 py-1 ${
                      allMessagesCurrentPage === number + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {number + 1}
                  </button>
                ))}

                {totalAllMessagesPages > 5 && (
                  <span className="px-3 py-1 bg-gray-200">...</span>
                )}

                {totalAllMessagesPages > 5 && (
                  <>
                    <button
                      onClick={() => paginateAllMessages(9)}
                      className="px-3 py-1 bg-gray-200"
                    >
                      9
                    </button>
                    <button
                      onClick={() => paginateAllMessages(10)}
                      className="px-3 py-1 bg-gray-200"
                    >
                      10
                    </button>
                  </>
                )}

                <button
                  onClick={() =>
                    paginateAllMessages(
                      allMessagesCurrentPage < totalAllMessagesPages
                        ? allMessagesCurrentPage + 1
                        : totalAllMessagesPages
                    )
                  }
                  className="px-3 py-1 bg-gray-200 rounded-r-md"
                  disabled={allMessagesCurrentPage === totalAllMessagesPages}
                >
                  &gt;
                </button>
              </nav>
            </div>
          </div>
        )}
      </div>

      {/* Message Details Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-2 rounded-md mr-2">
                  <Mail className="h-5 w-5 text-yellow-500" />
                </div>
                <h2 className="text-lg font-semibold">Message Details</h2>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              <p>
                <span className="font-semibold">From:</span>{" "}
                {selectedMessage.from}
              </p>
              <p>
                <span className="font-semibold">To:</span> Admin
              </p>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {selectedMessage.date}
              </p>

              <div>
                <p className="font-semibold">Message:</p>
                <p className="mt-1">{selectedMessage.message}</p>
              </div>

              <div className="flex space-x-3 mt-6">
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
                  Reply
                </button>
                <button
                  onClick={() => {
                    handleDeleteMessage(selectedMessage.id);
                    setSelectedMessage(null);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  Delete
                </button>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
                >
                  Back to Inbox
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagingParent;
