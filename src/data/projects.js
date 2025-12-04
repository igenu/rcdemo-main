const projects = [
    {
      id: "1238023",
      name: "PhD Topic & Proposal",
      status: "Pending",
      createdDate: "16 Oct 2021",
      milestones: [
        {
          title: "Topic Suggestion",
          description:
            "We need to suggest 2-3 topics based on the research area and requirements of the project....",
          status: "Pending"
        }
      ]
    },
    {
      id: "1238362",
      name: "Journal Paper",
      status: "InProccess",
      createdDate: "18 Dec 2021",
      acceptedDate : "18 Dec 2021",
      milestones: [
        {
          title: "Topic Suggestion",
          description:
            "We need to suggest 2-3 topics based on the research area and requirements of the project....",
          status: "Pending"
        },
        {
          title: "Journal Suggestion",
          description:
            "Based on a selected topic, we need to suggest 3-4 journals along with their impact factor and number of issues in a year....",
          status: "Pending"
        },
        {
          title: "Layout development",
          description:
            "Based on the selected topic and journal we need to develop a layout, keeping in mind the previous format of the papers, published within the same journal....",
          status: "Pending"
        },
        {
          title: "Data Analysis / Implementation",
          description:
            "As per the research objectives and research methodology, we need to work on the results of the paper. ...",
          status: "Pending"
        },
        {
          title: "Paper Writing",
          description:
            "Paper writing needs to be done as per the finalized layout and results according to the journal selected. ...",
          status: "Pending"
        }
      ],
      paymentHistory: {
        totalAmount: "INR 85000",
        dueAmount: "INR 60000",
        payments: [
          {
            sNo: 1,
            milestone: "Topic Suggestion",
            amountPaid: "INR 25000",
            paymentDate: "18 Dec 2021"
          }
        ]
      }
    },
    {
      id: "1238024",
      name: "Thesis Writing",
      status: "InProccess",
      createdDate: "16 Oct 2021",
      acceptedDate : "16 Oct 2021",
      milestones: [
        {
          title: "Layout Of Thesis",
          description:
            "Kindly frame a layout of the Thesis as per the scholar's topic",
          uploadedDate: null,
          status: "Waiting for Approval",
          writerCode : "WR-20180622129",
          dateOfCompletion : "25 Apr 2022",
          comments : "Dummy work"
        }
      ],
      paymentHistory: {
        totalAmount: "USD 1110",
        dueAmount: "USD 360",
        payments: [
          {
            sNo: 1,
            milestone: "Layout Of Thesis",
            amountPaid: "USD 750",
            paymentDate: "15 Oct 2021"
          }
        ]
      }
    }
  ];
  
  export default projects;