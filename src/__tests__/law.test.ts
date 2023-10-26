import { getNewlyEnactedLawId } from "@/lib/law/law";
import { RevisionInfo } from "@/lib/typescript-fetch";
import { expect, describe, it } from "vitest";

describe("getNewlyEnactedLawId", () => {
  it("正しい改正法令IDを返すべき", () => {
    const revisions: RevisionInfo[] = [
      { lawRevisionId: "1", amendmentLawId: "2" },
      { lawRevisionId: "2", amendmentLawId: "3" },
      { lawRevisionId: "3" },
    ];
    const result = getNewlyEnactedLawId(revisions);
    expect(result).toBe("3");
  });

  it("revisionが提供されていない場合はundefinedを返すべき", () => {
    const revisions: RevisionInfo[] = [];
    const result = getNewlyEnactedLawId(revisions);
    expect(result).toBeUndefined();
  });

  it("すべての修正がamendmentLawIdを持っている場合はundefinedを返すべき", () => {
    const revisions: RevisionInfo[] = [
      { lawRevisionId: "1", amendmentLawId: "2" },
      { lawRevisionId: "2", amendmentLawId: "3" },
      { lawRevisionId: "3", amendmentLawId: "4" },
    ];
    const result = getNewlyEnactedLawId(revisions);
    expect(result).toBeUndefined();
  });
});
