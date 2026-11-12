
export type PaperResource = {
  id: string;
  subject: string;
  year: string;
  session: string;
  paper: string;
  kind: string;
  fileName: string;
  origin: "dbe" | "local";
  province?: string;
  language?: string;
  url?: string;
  marks?: number;
  duration?: string;
};

export const paperCatalog: PaperResource[] = [
  {
    "id": "bd8ef6644629",
    "subject": "Accounting",
    "year": "2026",
    "session": "May/June",
    "paper": "Paper 2",
    "kind": "Marking Guidelines",
    "fileName": "Accounting P2 May-Jun 2026 MG Afr.pdf",
    "origin": "dbe",
    "language": "Afrikaans"
  },
  {
    "id": "313e922b0ed7",
    "subject": "Accounting",
    "year": "2025",
    "session": "November",
    "paper": "Paper 2",
    "kind": "Answer Book",
    "fileName": "Accounting P2 Nov 2025 Answer Book Eng.pdf",
    "origin": "dbe",
    "language": "English"
  },
  {
    "id": "f9bd3a58807b",
    "subject": "Accounting",
    "year": "2025",
    "session": "November",
    "paper": "Paper 2",
    "kind": "Marking Guidelines",
    "fileName": "Accounting P2 Nov 2025 MG Eng.pdf",
    "origin": "dbe",
    "language": "English"
  },
  {
    "id": "6a969ab99141",
    "subject": "Afrikaans First Additional Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 1",
    "kind": "Marking Guidelines",
    "fileName": "Afrikaans FAL P1 Nov 2025 MG.pdf",
    "origin": "dbe"
  },
  {
    "id": "b9aa1f5a09cc",
    "subject": "Afrikaans First Additional Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 1",
    "kind": "Question Paper",
    "fileName": "Afrikaans FAL P1 Nov 2025.pdf",
    "origin": "dbe"
  },
  {
    "id": "61f4d99a550b",
    "subject": "Afrikaans First Additional Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 2",
    "kind": "Marking Guidelines",
    "fileName": "Afrikaans FAL P2 Nov 2025 MG.pdf",
    "origin": "dbe"
  },
  {
    "id": "60478d897e17",
    "subject": "Afrikaans First Additional Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 2",
    "kind": "Question Paper",
    "fileName": "Afrikaans FAL P2 Nov 2025.pdf",
    "origin": "dbe"
  },
  {
    "id": "0cbaaa24d475",
    "subject": "Afrikaans First Additional Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 3",
    "kind": "Marking Guidelines",
    "fileName": "Afrikaans FAL P3 Nov 2025 MG.pdf",
    "origin": "dbe"
  },
  {
    "id": "9914101b17cf",
    "subject": "Afrikaans First Additional Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 3",
    "kind": "Question Paper",
    "fileName": "Afrikaans FAL P3 Nov 2025.pdf",
    "origin": "dbe"
  },
  {
    "id": "3e3a62da034b",
    "subject": "Afrikaans Home Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 1",
    "kind": "Marking Guidelines",
    "fileName": "Afrikaans HL P1 Nov 2025 MG.pdf",
    "origin": "dbe"
  },
  {
    "id": "f66b8ac1963b",
    "subject": "Afrikaans Home Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 1",
    "kind": "Question Paper",
    "fileName": "Afrikaans HL P1 Nov 2025.pdf",
    "origin": "dbe"
  },
  {
    "id": "25ebd5bec5b6",
    "subject": "Afrikaans Home Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 2",
    "kind": "Marking Guidelines",
    "fileName": "Afrikaans HL P2 Nov 2025 MG.pdf",
    "origin": "dbe"
  },
  {
    "id": "e5091d4bb344",
    "subject": "Afrikaans Home Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 2",
    "kind": "Question Paper",
    "fileName": "Afrikaans HL P2 Nov 2025.pdf",
    "origin": "dbe"
  },
  {
    "id": "7c2735d61076",
    "subject": "Afrikaans Home Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 3",
    "kind": "Question Paper",
    "fileName": "Afrikaans HL P3 Nov 2025.pdf",
    "origin": "dbe"
  },
  {
    "id": "29d3ca3e17d9",
    "subject": "Afrikaans Second Additional Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 1",
    "kind": "Question Paper",
    "fileName": "Afrikaans SAL P1 Nov 2025.pdf",
    "origin": "dbe"
  },
  {
    "id": "16a1b8f85e7d",
    "subject": "Afrikaans Second Additional Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 2",
    "kind": "Question Paper",
    "fileName": "Afrikaans SAL P2 Nov 2025 Eastern Cape.pdf",
    "origin": "dbe",
    "province": "Eastern Cape"
  },
  {
    "id": "d32b6a968375",
    "subject": "Afrikaans Second Additional Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 2",
    "kind": "Question Paper",
    "fileName": "Afrikaans SAL P2 Nov 2025 Free State(1).pdf",
    "origin": "dbe",
    "province": "Free State"
  },
  {
    "id": "bc035cbde5c8",
    "subject": "Afrikaans Second Additional Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 2",
    "kind": "Question Paper",
    "fileName": "Afrikaans SAL P2 Nov 2025 Gauteng(1).pdf",
    "origin": "dbe",
    "province": "Gauteng"
  },
  {
    "id": "5822d2700a1a",
    "subject": "Afrikaans Second Additional Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 2",
    "kind": "Question Paper",
    "fileName": "Afrikaans SAL P2 Nov 2025 KwaZulu-Natal(1).pdf",
    "origin": "dbe",
    "province": "KwaZulu-Natal"
  },
  {
    "id": "8f8b78eb03b4",
    "subject": "Afrikaans Second Additional Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 2",
    "kind": "Question Paper",
    "fileName": "Afrikaans SAL P2 Nov 2025 Limpopo(1).pdf",
    "origin": "dbe",
    "province": "Limpopo"
  },
  {
    "id": "f2f1235fa73f",
    "subject": "Afrikaans Second Additional Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 2",
    "kind": "Marking Guidelines",
    "fileName": "Afrikaans SAL P2 Nov 2025 MG Eastern Cape(1).pdf",
    "origin": "dbe",
    "province": "Eastern Cape"
  },
  {
    "id": "942550ae0e3b",
    "subject": "Afrikaans Second Additional Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 2",
    "kind": "Marking Guidelines",
    "fileName": "Afrikaans SAL P2 Nov 2025 MG Free State.pdf",
    "origin": "dbe",
    "province": "Free State"
  },
  {
    "id": "bb593046d556",
    "subject": "Afrikaans Second Additional Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 2",
    "kind": "Marking Guidelines",
    "fileName": "Afrikaans SAL P2 Nov 2025 MG Gauteng.pdf",
    "origin": "dbe",
    "province": "Gauteng"
  },
  {
    "id": "0cf554b813bb",
    "subject": "Afrikaans Second Additional Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 2",
    "kind": "Question Paper",
    "fileName": "Afrikaans SAL P2 Nov 2025 Mpumalanga.pdf",
    "origin": "dbe",
    "province": "Mpumalanga"
  },
  {
    "id": "aa693ff2ad1e",
    "subject": "Afrikaans Second Additional Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 2",
    "kind": "Question Paper",
    "fileName": "Afrikaans SAL P2 Nov 2025 North West.pdf",
    "origin": "dbe",
    "province": "North West"
  },
  {
    "id": "16ad16b50552",
    "subject": "Afrikaans Second Additional Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 2",
    "kind": "Question Paper",
    "fileName": "Afrikaans SAL P2 Nov 2025 Northern Cape.pdf",
    "origin": "dbe",
    "province": "Northern Cape"
  },
  {
    "id": "db5f6ade77b4",
    "subject": "Agricultural Management Practices",
    "year": "2025",
    "session": "November",
    "paper": "General Paper",
    "kind": "Question Paper",
    "fileName": "Agricultural Management Practices Nov 2025 Eng.pdf",
    "origin": "dbe",
    "language": "English"
  },
  {
    "id": "e22412fdc565",
    "subject": "Agricultural Sciences",
    "year": "2025",
    "session": "November",
    "paper": "Paper 2",
    "kind": "Question Paper",
    "fileName": "Agricultural Sciences P2 Nov 2025 Eng.pdf",
    "origin": "dbe",
    "language": "English"
  },
  {
    "id": "3a3ba56b3ca2",
    "subject": "Agricultural Technology",
    "year": "2025",
    "session": "November",
    "paper": "General Paper",
    "kind": "Question Paper",
    "fileName": "Agricultural Technology Nov 2025 Eng.pdf",
    "origin": "dbe",
    "language": "English"
  },
  {
    "id": "6cfec60f8246",
    "subject": "Civil Technology",
    "year": "2025",
    "session": "November",
    "paper": "General Paper",
    "kind": "Question Paper",
    "fileName": "Civil Technology Nov 2025 (Woodworking) Eng.pdf",
    "origin": "dbe",
    "language": "English"
  },
  {
    "id": "685a5ed0e334",
    "subject": "Computer Applications Technology",
    "year": "2025",
    "session": "November",
    "paper": "Paper 1",
    "kind": "Question Paper",
    "fileName": "Computer Applications Technology P1 Nov 2025 Eng.pdf",
    "origin": "dbe",
    "language": "English"
  },
  {
    "id": "603ba7c8b62b",
    "subject": "Computer Applications Technology",
    "year": "2025",
    "session": "November",
    "paper": "Paper 2",
    "kind": "Question Paper",
    "fileName": "Computer Applications Technology P2 Nov 2025 Eng.pdf",
    "origin": "dbe",
    "language": "English"
  },
  {
    "id": "942b59440ce7",
    "subject": "Dance Studies",
    "year": "2025",
    "session": "November",
    "paper": "General Paper",
    "kind": "Question Paper",
    "fileName": "Dance Studies Nov 2025 Eng.pdf",
    "origin": "dbe",
    "language": "English"
  },
  {
    "id": "880241d09c8a",
    "subject": "Dramatic Arts",
    "year": "2025",
    "session": "November",
    "paper": "General Paper",
    "kind": "Marking Guidelines",
    "fileName": "Dramatic Arts Nov 2025 MG Eng.pdf",
    "origin": "dbe",
    "language": "English"
  },
  {
    "id": "d06d86fcd1bc",
    "subject": "Economics",
    "year": "2025",
    "session": "November",
    "paper": "Paper 1",
    "kind": "Question Paper",
    "fileName": "Economics P1 Nov 2025 Afr.pdf",
    "origin": "dbe",
    "language": "Afrikaans"
  },
  {
    "id": "7571a58400ab",
    "subject": "Economics",
    "year": "2025",
    "session": "November",
    "paper": "Paper 2",
    "kind": "Question Paper",
    "fileName": "Economics P2 Nov 2025 Eng.pdf",
    "origin": "dbe",
    "language": "English"
  },
  {
    "id": "4e784d92046e",
    "subject": "Electrical Technology: Digital",
    "year": "2026",
    "session": "May/June",
    "paper": "General Paper",
    "kind": "Marking Guidelines",
    "fileName": "Electrical Technology May-June 2026 (Digital) MG Eng.pdf",
    "origin": "dbe",
    "language": "English"
  },
  {
    "id": "ec13cfa1ab52",
    "subject": "Electrical Technology: Electronics",
    "year": "2025",
    "session": "November",
    "paper": "General Paper",
    "kind": "Question Paper",
    "fileName": "Electrical Technology Nov 2025 (Electronics) Afr.pdf",
    "origin": "dbe",
    "language": "Afrikaans"
  },
  {
    "id": "735f6861ec9d",
    "subject": "Electrical Technology: Electronics",
    "year": "2025",
    "session": "November",
    "paper": "General Paper",
    "kind": "Marking Guidelines",
    "fileName": "Electrical Technology Nov 2025 (Electronics) MG Eng.pdf",
    "origin": "dbe",
    "language": "English"
  },
  {
    "id": "28e868f03b8b",
    "subject": "English First Additional Language",
    "year": "2026",
    "session": "May/June",
    "paper": "Paper 1",
    "kind": "Question Paper",
    "fileName": "English FAL P1 May-June 2026.pdf",
    "origin": "dbe"
  },
  {
    "id": "a35dd7b06db3",
    "subject": "English First Additional Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 1",
    "kind": "Marking Guidelines",
    "fileName": "English FAL P1 Nov 2025 MG (1).pdf",
    "origin": "dbe"
  },
  {
    "id": "52dc822e2c51",
    "subject": "English First Additional Language",
    "year": "2026",
    "session": "May/June",
    "paper": "Paper 2",
    "kind": "Marking Guidelines",
    "fileName": "English FAL P2 May-June 2026 MG.pdf",
    "origin": "dbe"
  },
  {
    "id": "c5983ac8e256",
    "subject": "English First Additional Language",
    "year": "2026",
    "session": "May/June",
    "paper": "Paper 2",
    "kind": "Question Paper",
    "fileName": "English FAL P2 May-June 2026.pdf",
    "origin": "dbe"
  },
  {
    "id": "25e85d4afea0",
    "subject": "English First Additional Language",
    "year": "2025",
    "session": "May/June",
    "paper": "Paper 3",
    "kind": "Question Paper",
    "fileName": "English FAL P3 May-June 2025.pdf",
    "origin": "dbe"
  },
  {
    "id": "fc7deba08f59",
    "subject": "English First Additional Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 3",
    "kind": "Marking Guidelines",
    "fileName": "English FAL P3 Nov 2025 MG.pdf",
    "origin": "dbe"
  },
  {
    "id": "e07229e7dd06",
    "subject": "English Home Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 1",
    "kind": "Marking Guidelines",
    "fileName": "English HL P1 Nov 2025 MG.pdf",
    "origin": "dbe"
  },
  {
    "id": "97cdf766f08b",
    "subject": "English Second Additional Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 1",
    "kind": "Marking Guidelines",
    "fileName": "English SAL P1 Nov 2025 MG.pdf",
    "origin": "dbe"
  },
  {
    "id": "3327c8c090ef",
    "subject": "English Second Additional Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 3",
    "kind": "Marking Guidelines",
    "fileName": "English SAL P3 Nov 2025 MG.pdf",
    "origin": "dbe"
  },
  {
    "id": "e43ecce2e3f1",
    "subject": "Geography",
    "year": "2025",
    "session": "November",
    "paper": "Paper 1",
    "kind": "Question Paper",
    "fileName": "Geography P1 Nov 2025 Eng.pdf",
    "origin": "dbe",
    "language": "English"
  },
  {
    "id": "ba05e40300f9",
    "subject": "History",
    "year": "2025",
    "session": "November",
    "paper": "Paper 2",
    "kind": "Addendum",
    "fileName": "History P2 Nov 2025 Addendum Eng.pdf",
    "origin": "dbe",
    "language": "English"
  },
  {
    "id": "a03e8e8abd77",
    "subject": "isiNdebele First Additional Language",
    "year": "2026",
    "session": "May/June",
    "paper": "Paper 1",
    "kind": "Question Paper",
    "fileName": "IsiNdebele FAL P1 May-June 2026.pdf",
    "origin": "dbe"
  },
  {
    "id": "2b5cc287e218",
    "subject": "isiNdebele First Additional Language",
    "year": "2026",
    "session": "May/June",
    "paper": "Paper 2",
    "kind": "Question Paper",
    "fileName": "IsiNdebele FAL P2 May-June 2026.pdf",
    "origin": "dbe"
  },
  {
    "id": "eac18ab4797f",
    "subject": "isiXhosa First Additional Language",
    "year": "2026",
    "session": "May/June",
    "paper": "Paper 1",
    "kind": "Marking Guidelines",
    "fileName": "IsiXhosa FAL P1 May-June 2026 MG.pdf",
    "origin": "dbe"
  },
  {
    "id": "bffc0e85528b",
    "subject": "isiXhosa First Additional Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 1",
    "kind": "Marking Guidelines",
    "fileName": "IsiXhosa FAL P1 Nov 2025 MG.pdf",
    "origin": "dbe"
  },
  {
    "id": "25d37445fa4e",
    "subject": "isiXhosa First Additional Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 1",
    "kind": "Question Paper",
    "fileName": "IsiXhosa FAL P1 Nov 2025.pdf",
    "origin": "dbe"
  },
  {
    "id": "3168f9cd121e",
    "subject": "isiXhosa First Additional Language",
    "year": "2026",
    "session": "May/June",
    "paper": "Paper 2",
    "kind": "Question Paper",
    "fileName": "IsiXhosa FAL P2 May-June 2026.pdf",
    "origin": "dbe"
  },
  {
    "id": "79accb4a6111",
    "subject": "isiXhosa Second Additional Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 2",
    "kind": "Question Paper",
    "fileName": "IsiXhosa SAL P2 Nov 2025.pdf",
    "origin": "dbe"
  },
  {
    "id": "b9caf0aa9335",
    "subject": "isiXhosa Second Additional Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 3",
    "kind": "Marking Guidelines",
    "fileName": "IsiXhosa SAL P3 Nov 2025 MG.pdf",
    "origin": "dbe"
  },
  {
    "id": "beaf6c2802a2",
    "subject": "isiZulu First Additional Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 1",
    "kind": "Marking Guidelines",
    "fileName": "IsiZulu FAL P1 Nov 2025 MG.pdf",
    "origin": "dbe"
  },
  {
    "id": "e6b21706351b",
    "subject": "isiZulu First Additional Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 1",
    "kind": "Question Paper",
    "fileName": "IsiZulu FAL P1 Nov 2025.pdf",
    "origin": "dbe"
  },
  {
    "id": "b4e3e8f6b083",
    "subject": "isiZulu First Additional Language",
    "year": "2026",
    "session": "May/June",
    "paper": "Paper 2",
    "kind": "Marking Guidelines",
    "fileName": "IsiZulu FAL P2 May-June 2026 MG.pdf",
    "origin": "dbe"
  },
  {
    "id": "185f2ab9f612",
    "subject": "isiZulu First Additional Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 2",
    "kind": "Question Paper",
    "fileName": "IsiZulu FAL P2 Nov 2025.pdf",
    "origin": "dbe"
  },
  {
    "id": "4b27da636ca4",
    "subject": "isiZulu Second Additional Language",
    "year": "2025",
    "session": "November",
    "paper": "Paper 3",
    "kind": "Marking Guidelines",
    "fileName": "IsiZulu SAL P3 Nov 2025 MG.pdf",
    "origin": "dbe"
  },
  {
    "id": "baf0af40673f",
    "subject": "Life Orientation",
    "year": "2025",
    "session": "September",
    "paper": "General Paper",
    "kind": "Marking Guidelines",
    "fileName": "Life Orientation September 2025 MG Afr.pdf",
    "origin": "dbe",
    "language": "Afrikaans"
  },
  {
    "id": "d95bf32df044",
    "subject": "English First Additional Language",
    "year": "2026",
    "session": "May/June",
    "paper": "Paper 1",
    "kind": "Marking Guidelines",
    "fileName": "English FAL P1 May-June 2026 MG.pdf",
    "origin": "dbe"
  }
];
