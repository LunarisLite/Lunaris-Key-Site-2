// Lunaris Key System - Comprehensive key management and validation

export interface LunarisKey {
  id: string;
  key: string;
  type: 'developer' | 'premium' | 'standard';
  createdAt: string;
  expiresAt: string;
  used?: boolean;
  usedAt?: string;
  usedBy?: string; // Could be IP or session ID
}

export interface KeyValidationResult {
  isValid: boolean;
  key?: LunarisKey;
  reason?: string;
  accessLevel: 'developer' | 'premium' | 'standard' | 'none';
  expiresAt?: Date;
}

// Official Lunaris Key Database
const LUNARIS_KEYS: LunarisKey[] = [
  // Standard Keys (70)
  {
    "id": "std-1",
    "key": "STD-mf92ujer-JkINbLb0-0001",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-2",
    "key": "STD-mf92ujer-yP2DTBoK-0002",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-3",
    "key": "STD-mf92ujer-2zKv17ll-0003",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-4",
    "key": "STD-mf92ujer-yDe8oOTO-0004",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-5",
    "key": "STD-mf92ujer-TyCq5uod-0005",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-6",
    "key": "STD-mf92ujer-3Ljxs6Es-0006",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-7",
    "key": "STD-mf92ujer-JbE0pBrq-0007",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-8",
    "key": "STD-mf92ujer-mbOKYXsS-0008",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-9",
    "key": "STD-mf92ujer-FUgiAgIi-0009",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-10",
    "key": "STD-mf92ujer-nKdvu2SH-000a",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-11",
    "key": "STD-mf92ujer-h86YKvYS-000b",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-12",
    "key": "STD-mf92ujer-D4wtLRrc-000c",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-13",
    "key": "STD-mf92ujer-8wPkgM1q-000d",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-14",
    "key": "STD-mf92ujer-ozscO5zL-000e",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-15",
    "key": "STD-mf92ujer-F8jVqQkJ-000f",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-16",
    "key": "STD-mf92ujer-QsDEsvaV-000g",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-17",
    "key": "STD-mf92ujer-BzEwzE46-000h",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-18",
    "key": "STD-mf92ujer-qufaQckd-000i",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-19",
    "key": "STD-mf92ujer-jWoB7lvP-000j",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-20",
    "key": "STD-mf92ujer-07adnDE4-000k",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-21",
    "key": "STD-mf92ujer-U1CXTT8X-000l",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-22",
    "key": "STD-mf92ujer-KuIKBZUV-000m",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-23",
    "key": "STD-mf92ujer-FW2ec3gF-000n",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-24",
    "key": "STD-mf92ujer-MEZ8HBGY-000o",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-25",
    "key": "STD-mf92ujer-2vhtOR5d-000p",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-26",
    "key": "STD-mf92ujer-rjghMytD-000q",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-27",
    "key": "STD-mf92ujer-E84zWG5B-000r",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-28",
    "key": "STD-mf92ujer-6UEy8RPe-000s",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-29",
    "key": "STD-mf92ujer-amJZ4LDa-000t",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-30",
    "key": "STD-mf92ujer-oL71Zr4j-000u",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-31",
    "key": "STD-mf92ujer-m5edf8L9-000v",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-32",
    "key": "STD-mf92ujer-LrwcxCYK-000w",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-33",
    "key": "STD-mf92ujer-qfUbyCpa-000x",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-34",
    "key": "STD-mf92ujer-LomisCKn-000y",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-35",
    "key": "STD-mf92ujer-I5wIvxX2-000z",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-36",
    "key": "STD-mf92ujer-KH704BuY-0010",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-37",
    "key": "STD-mf92ujer-Sscn0fF8-0011",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-38",
    "key": "STD-mf92ujer-djZDeNjD-0012",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-39",
    "key": "STD-mf92ujer-1yor8T2Z-0013",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-40",
    "key": "STD-mf92ujer-ZVsuuHJg-0014",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-41",
    "key": "STD-mf92ujer-hMcDUPWI-0015",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-42",
    "key": "STD-mf92ujer-oVYIvoe6-0016",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-43",
    "key": "STD-mf92ujer-dJpbghpg-0017",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-44",
    "key": "STD-mf92ujer-FTY38Jd9-0018",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-45",
    "key": "STD-mf92ujer-7jfhGg53-0019",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-46",
    "key": "STD-mf92ujer-tW951SXo-001a",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-47",
    "key": "STD-mf92ujer-qcbZN4et-001b",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-48",
    "key": "STD-mf92ujer-71zPRnkC-001c",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-49",
    "key": "STD-mf92ujer-bUDc0qnI-001d",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-50",
    "key": "STD-mf92ujer-deU8IlLa-001e",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.803Z",
    "expiresAt": "2025-10-07T02:32:04.803Z"
  },
  {
    "id": "std-51",
    "key": "STD-mf92ujes-SX5JECOt-001f",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2025-10-07T02:32:04.804Z"
  },
  {
    "id": "std-52",
    "key": "STD-mf92ujes-jT4lfPOp-001g",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2025-10-07T02:32:04.804Z"
  },
  {
    "id": "std-53",
    "key": "STD-mf92ujes-QxbbRuAx-001h",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2025-10-07T02:32:04.804Z"
  },
  {
    "id": "std-54",
    "key": "STD-mf92ujes-OTonjHfe-001i",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2025-10-07T02:32:04.804Z"
  },
  {
    "id": "std-55",
    "key": "STD-mf92ujes-BZ1qpyYU-001j",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2025-10-07T02:32:04.804Z"
  },
  {
    "id": "std-56",
    "key": "STD-mf92ujes-7DjtNpWq-001k",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2025-10-07T02:32:04.804Z"
  },
  {
    "id": "std-57",
    "key": "STD-mf92ujes-hYvzKZYI-001l",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2025-10-07T02:32:04.804Z"
  },
  {
    "id": "std-58",
    "key": "STD-mf92ujes-OChgTLg5-001m",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2025-10-07T02:32:04.804Z"
  },
  {
    "id": "std-59",
    "key": "STD-mf92ujes-6aW4QGOp-001n",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2025-10-07T02:32:04.804Z"
  },
  {
    "id": "std-60",
    "key": "STD-mf92ujes-9tEWdyDq-001o",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2025-10-07T02:32:04.804Z"
  },
  {
    "id": "std-61",
    "key": "STD-mf92ujes-ZsyomhDZ-001p",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2025-10-07T02:32:04.804Z"
  },
  {
    "id": "std-62",
    "key": "STD-mf92ujes-OEzCQJt3-001q",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2025-10-07T02:32:04.804Z"
  },
  {
    "id": "std-63",
    "key": "STD-mf92ujes-mp2HnriF-001r",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2025-10-07T02:32:04.804Z"
  },
  {
    "id": "std-64",
    "key": "STD-mf92ujes-ezhoW02K-001s",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2025-10-07T02:32:04.804Z"
  },
  {
    "id": "std-65",
    "key": "STD-mf92ujes-k9Yqn9RQ-001t",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2025-10-07T02:32:04.804Z"
  },
  {
    "id": "std-66",
    "key": "STD-mf92ujes-x2M0hm4N-001u",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2025-10-07T02:32:04.804Z"
  },
  {
    "id": "std-67",
    "key": "STD-mf92ujes-fgWL3W1j-001v",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2025-10-07T02:32:04.804Z"
  },
  {
    "id": "std-68",
    "key": "STD-mf92ujes-B2FQZu12-001w",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2025-10-07T02:32:04.804Z"
  },
  {
    "id": "std-69",
    "key": "STD-mf92ujes-msbRJUfh-001x",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2025-10-07T02:32:04.804Z"
  },
  {
    "id": "std-70",
    "key": "STD-mf92ujes-hixSrVBY-001y",
    "type": "standard",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2025-10-07T02:32:04.804Z"
  },
  // Premium Keys (20)
  {
    "id": "prm-1",
    "key": "PRM-mf92ujes-fWaE7L9z-001z",
    "type": "premium",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2026-09-07T02:32:04.804Z"
  },
  {
    "id": "prm-2",
    "key": "PRM-mf92ujes-fsM2WKk0-0020",
    "type": "premium",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2026-09-07T02:32:04.804Z"
  },
  {
    "id": "prm-3",
    "key": "PRM-mf92ujes-2iU7R4ir-0021",
    "type": "premium",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2026-09-07T02:32:04.804Z"
  },
  {
    "id": "prm-4",
    "key": "PRM-mf92ujes-XqSZJCbo-0022",
    "type": "premium",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2026-09-07T02:32:04.804Z"
  },
  {
    "id": "prm-5",
    "key": "PRM-mf92ujes-f4Q0jdF7-0023",
    "type": "premium",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2026-09-07T02:32:04.804Z"
  },
  {
    "id": "prm-6",
    "key": "PRM-mf92ujes-QPyHJwxr-0024",
    "type": "premium",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2026-09-07T02:32:04.804Z"
  },
  {
    "id": "prm-7",
    "key": "PRM-mf92ujes-3PqC3q6w-0025",
    "type": "premium",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2026-09-07T02:32:04.804Z"
  },
  {
    "id": "prm-8",
    "key": "PRM-mf92ujes-RrVQDycE-0026",
    "type": "premium",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2026-09-07T02:32:04.804Z"
  },
  {
    "id": "prm-9",
    "key": "PRM-mf92ujes-8L7Xqirg-0027",
    "type": "premium",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2026-09-07T02:32:04.804Z"
  },
  {
    "id": "prm-10",
    "key": "PRM-mf92ujes-4724Hmrr-0028",
    "type": "premium",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2026-09-07T02:32:04.804Z"
  },
  {
    "id": "prm-11",
    "key": "PRM-mf92ujes-R1E8Oqr6-0029",
    "type": "premium",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2026-09-07T02:32:04.804Z"
  },
  {
    "id": "prm-12",
    "key": "PRM-mf92ujes-TBhs65KB-002a",
    "type": "premium",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2026-09-07T02:32:04.804Z"
  },
  {
    "id": "prm-13",
    "key": "PRM-mf92ujes-il8LUd8f-002b",
    "type": "premium",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2026-09-07T02:32:04.804Z"
  },
  {
    "id": "prm-14",
    "key": "PRM-mf92ujes-FnHHtb79-002c",
    "type": "premium",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2026-09-07T02:32:04.804Z"
  },
  {
    "id": "prm-15",
    "key": "PRM-mf92ujes-ICeWOxIR-002d",
    "type": "premium",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2026-09-07T02:32:04.804Z"
  },
  {
    "id": "prm-16",
    "key": "PRM-mf92ujes-HfNGX5Qa-002e",
    "type": "premium",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2026-09-07T02:32:04.804Z"
  },
  {
    "id": "prm-17",
    "key": "PRM-mf92ujes-SdBQ7BZi-002f",
    "type": "premium",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2026-09-07T02:32:04.804Z"
  },
  {
    "id": "prm-18",
    "key": "PRM-mf92ujes-IWRAqZYu-002g",
    "type": "premium",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2026-09-07T02:32:04.804Z"
  },
  {
    "id": "prm-19",
    "key": "PRM-mf92ujes-yxCAEykc-002h",
    "type": "premium",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2026-09-07T02:32:04.804Z"
  },
  {
    "id": "prm-20",
    "key": "PRM-mf92ujes-0WrWrXyD-002i",
    "type": "premium",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2026-09-07T02:32:04.804Z"
  },
  // Developer Keys (10)
  {
    "id": "dev-1",
    "key": "DEV-mf92ujes-1pUqsVIY-002j",
    "type": "developer",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2027-09-07T02:32:04.804Z"
  },
  {
    "id": "dev-2",
    "key": "DEV-mf92ujes-pErPQHKY-002k",
    "type": "developer",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2027-09-07T02:32:04.804Z"
  },
  {
    "id": "dev-3",
    "key": "DEV-mf92ujes-0rzhPmUf-002l",
    "type": "developer",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2027-09-07T02:32:04.804Z"
  },
  {
    "id": "dev-4",
    "key": "DEV-mf92ujes-bVgxy1kY-002m",
    "type": "developer",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2027-09-07T02:32:04.804Z"
  },
  {
    "id": "dev-5",
    "key": "DEV-mf92ujes-qk9QkAQr-002n",
    "type": "developer",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2027-09-07T02:32:04.804Z"
  },
  {
    "id": "dev-6",
    "key": "DEV-mf92ujes-DmQCCZOB-002o",
    "type": "developer",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2027-09-07T02:32:04.804Z"
  },
  {
    "id": "dev-7",
    "key": "DEV-mf92ujes-LlLM5TxK-002p",
    "type": "developer",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2027-09-07T02:32:04.804Z"
  },
  {
    "id": "dev-8",
    "key": "DEV-mf92ujes-YTHd08Gs-002q",
    "type": "developer",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2027-09-07T02:32:04.804Z"
  },
  {
    "id": "dev-9",
    "key": "DEV-mf92ujes-iLpZiakC-002r",
    "type": "developer",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2027-09-07T02:32:04.804Z"
  },
  {
    "id": "dev-10",
    "key": "DEV-mf92ujes-pDbdHBtr-002s",
    "type": "developer",
    "createdAt": "2025-09-07T02:32:04.804Z",
    "expiresAt": "2027-09-07T02:32:04.804Z"
  }
];

// Local Storage Keys
const USED_KEYS_STORAGE = 'lunaris_used_keys';
const CURRENT_SESSION_STORAGE = 'lunaris_current_session';

// Session Management
interface SessionData {
  keyId: string;
  keyType: 'developer' | 'premium' | 'standard';
  expiresAt: string;
  usedAt: string;
  sessionId: string;
}

// Utility Functions
export class LunarisKeyAPI {
  private static generateSessionId(): string {
    return 'LNR_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36);
  }

  private static getUsedKeys(): string[] {
    try {
      const stored = localStorage.getItem(USED_KEYS_STORAGE);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private static addUsedKey(keyId: string): void {
    try {
      const usedKeys = this.getUsedKeys();
      if (!usedKeys.includes(keyId)) {
        usedKeys.push(keyId);
        localStorage.setItem(USED_KEYS_STORAGE, JSON.stringify(usedKeys));
      }
    } catch (error) {
      console.error('Failed to save used key:', error);
    }
  }

  private static isKeyExpired(expiresAt: string): boolean {
    return new Date() > new Date(expiresAt);
  }

  private static cleanupExpiredSessions(): void {
    try {
      const session = localStorage.getItem(CURRENT_SESSION_STORAGE);
      if (session) {
        const sessionData: SessionData = JSON.parse(session);
        if (this.isKeyExpired(sessionData.expiresAt)) {
          localStorage.removeItem(CURRENT_SESSION_STORAGE);
        }
      }
    } catch (error) {
      console.error('Failed to cleanup expired session:', error);
    }
  }

  // Main API Methods
  public static async validateKey(inputKey: string): Promise<KeyValidationResult> {
    // Clean up any expired sessions first
    this.cleanupExpiredSessions();

    // Format and sanitize input (preserve case for exact matching)
    const cleanKey = inputKey.trim();
    
    // Check if key exists in our database
    const foundKey = LUNARIS_KEYS.find(k => k.key === cleanKey);
    
    if (!foundKey) {
      return {
        isValid: false,
        reason: 'Invalid key format or key not found',
        accessLevel: 'none'
      };
    }

    // Check if key has expired
    if (this.isKeyExpired(foundKey.expiresAt)) {
      return {
        isValid: false,
        reason: 'Key has expired',
        accessLevel: 'none'
      };
    }

    // Check if key has already been used
    const usedKeys = this.getUsedKeys();
    if (usedKeys.includes(foundKey.id)) {
      return {
        isValid: false,
        reason: 'Key has already been used',
        accessLevel: 'none'
      };
    }

    // Mark key as used and create session
    this.addUsedKey(foundKey.id);
    
    const sessionData: SessionData = {
      keyId: foundKey.id,
      keyType: foundKey.type,
      expiresAt: foundKey.expiresAt,
      usedAt: new Date().toISOString(),
      sessionId: this.generateSessionId()
    };

    try {
      localStorage.setItem(CURRENT_SESSION_STORAGE, JSON.stringify(sessionData));
    } catch (error) {
      console.error('Failed to save session:', error);
    }

    return {
      isValid: true,
      key: foundKey,
      accessLevel: foundKey.type,
      expiresAt: new Date(foundKey.expiresAt)
    };
  }

  public static getCurrentSession(): SessionData | null {
    try {
      const session = localStorage.getItem(CURRENT_SESSION_STORAGE);
      if (!session) return null;

      const sessionData: SessionData = JSON.parse(session);
      
      // Check if session is expired
      if (this.isKeyExpired(sessionData.expiresAt)) {
        localStorage.removeItem(CURRENT_SESSION_STORAGE);
        return null;
      }

      return sessionData;
    } catch {
      return null;
    }
  }

  public static clearSession(): void {
    try {
      localStorage.removeItem(CURRENT_SESSION_STORAGE);
    } catch (error) {
      console.error('Failed to clear session:', error);
    }
  }

  public static getKeyStats(): { total: number; used: number; available: number; byType: Record<string, { total: number; used: number }> } {
    const usedKeys = this.getUsedKeys();
    const now = new Date();
    
    // Filter out expired keys
    const validKeys = LUNARIS_KEYS.filter(key => !this.isKeyExpired(key.expiresAt));
    
    const stats = {
      total: validKeys.length,
      used: usedKeys.length,
      available: validKeys.length - usedKeys.length,
      byType: {
        developer: { total: 0, used: 0 },
        premium: { total: 0, used: 0 },
        standard: { total: 0, used: 0 }
      }
    };

    validKeys.forEach(key => {
      stats.byType[key.type].total++;
      if (usedKeys.includes(key.id)) {
        stats.byType[key.type].used++;
      }
    });

    return stats;
  }

  public static isValidKeyFormat(key: string): boolean {
    const patterns = {
      developer: /^DEV-[a-zA-Z0-9]{8}-[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}$/,
      premium: /^PRM-[a-zA-Z0-9]{8}-[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}$/,
      standard: /^STD-[a-zA-Z0-9]{8}-[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}$/
    };

    const cleanKey = key.trim();
    return Object.values(patterns).some(pattern => pattern.test(cleanKey));
  }

  // Admin functions (for development/testing)
  public static __dev_resetUsedKeys(): void {
    if (process.env.NODE_ENV === 'development') {
      localStorage.removeItem(USED_KEYS_STORAGE);
      localStorage.removeItem(CURRENT_SESSION_STORAGE);
    }
  }

  public static __dev_getUsedKeys(): string[] {
    if (process.env.NODE_ENV === 'development') {
      return this.getUsedKeys();
    }
    return [];
  }
}

// Export for convenience
export default LunarisKeyAPI;