import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import * as XLSX from "xlsx";

export type DurationFilter = "all" | "short" | "long";
export type TimeFilter = "all" | "1m" | "2m" | "6m" | "1y";
export type ViewMode = "cards" | "table";

export interface RatioLevelConfig {
  level: number;
  label: string;
  description: string;
  min: number;
  max: number | null;
}

export interface VideoResult {
  id: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  channelTitle: string;
  channelId: string;
  publishedAt: string;
  durationSeconds: number;
  durationFormatted: string;
  isShortForm: boolean;
  viewCount: number;
  likeCount: number | null;
  commentCount: number | null;
  subscriberCount: number | null;
  viewToSubscriberRatio: number | null;
  ratioLevel: number | null;
}

export const ratioLevels: RatioLevelConfig[] = [
  {
    level: 1,
    label: "1단계",
    description: "조회수가 구독자의 25% 미만",
    min: 0,
    max: 0.25,
  },
  {
    level: 2,
    label: "2단계",
    description: "조회수가 구독자의 25% 이상 75% 미만",
    min: 0.25,
    max: 0.75,
  },
  {
    level: 3,
    label: "3단계",
    description: "조회수와 구독자 수가 비슷한 1:1 수준",
    min: 0.75,
    max: 1.5,
  },
  {
    level: 4,
    label: "4단계",
    description: "조회수가 구독자의 1.5배 이상 3배 미만",
    min: 1.5,
    max: 3,
  },
  {
    level: 5,
    label: "5단계",
    description: "조회수가 구독자의 3배 이상으로 매우 우수",
    min: 3,
    max: null,
  },
];

export const durationFilterOptions: { label: string; value: DurationFilter }[] =
  [
    { label: "전체 길이", value: "all" },
    { label: "숏폼 (1분 미만)", value: "short" },
    { label: "롱폼 (1분 이상)", value: "long" },
  ];

export const timeFilterOptions: { label: string; value: TimeFilter }[] = [
  { label: "전체 기간", value: "all" },
  { label: "최근 1개월", value: "1m" },
  { label: "최근 2개월", value: "2m" },
  { label: "최근 6개월", value: "6m" },
  { label: "최근 1년", value: "1y" },
];

const defaultApiKey = "AIzaSyBIVCbDPsleRl3fn18cUMNxlBbQmtZcJ1g";

function isoDurationToSeconds(iso: string): number {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) {
    return 0;
  }

  const hours = parseInt(match[1] ?? "0", 10);
  const minutes = parseInt(match[2] ?? "0", 10);
  const seconds = parseInt(match[3] ?? "0", 10);

  return hours * 3600 + minutes * 60 + seconds;
}

function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

export function formatNumber(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-";
  }

  return new Intl.NumberFormat("ko-KR").format(value);
}

export function formatDate(date: string): string {
  try {
    return new Date(date).toLocaleDateString("ko-KR");
  } catch {
    return date;
  }
}

function determineRatioLevel(ratio: number | null): number | null {
  if (ratio === null) {
    return null;
  }

  for (const config of ratioLevels) {
    if (config.max === null && ratio >= config.min) {
      return config.level;
    }
    if (config.max !== null && ratio >= config.min && ratio < config.max) {
      return config.level;
    }
  }

  return null;
}

function getPublishedAfter(filter: TimeFilter): string | null {
  if (filter === "all") {
    return null;
  }

  const now = new Date();
  switch (filter) {
    case "1m":
      now.setMonth(now.getMonth() - 1);
      break;
    case "2m":
      now.setMonth(now.getMonth() - 2);
      break;
    case "6m":
      now.setMonth(now.getMonth() - 6);
      break;
    case "1y":
      now.setFullYear(now.getFullYear() - 1);
      break;
  }

  return now.toISOString();
}

export function buildVideoUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

interface YouTubeAnalyticsContextValue {
  apiKey: string;
  apiKeyInput: string;
  hasStoredKey: boolean;
  setApiKeyInput: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  durationFilter: DurationFilter;
  setDurationFilter: (value: DurationFilter) => void;
  timeFilter: TimeFilter;
  setTimeFilter: (value: TimeFilter) => void;
  ratioFilter: number | "all";
  setRatioFilter: (value: number | "all") => void;
  viewMode: ViewMode;
  setViewMode: (value: ViewMode) => void;
  isLoading: boolean;
  error: string | null;
  setError: (value: string | null) => void;
  videos: VideoResult[];
  filteredVideos: VideoResult[];
  lastUpdated: Date | null;
  handleSaveApiKey: () => void;
  handleSearch: () => Promise<void>;
  handleExportExcel: () => void;
}

const YouTubeAnalyticsContext = createContext<
  YouTubeAnalyticsContextValue | undefined
>(undefined);

export function YouTubeAnalyticsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [apiKey, setApiKey] = useState("");
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [hasStoredKey, setHasStoredKey] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [durationFilter, setDurationFilter] =
    useState<DurationFilter>("all");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("1m");
  const [ratioFilter, setRatioFilter] = useState<number | "all">("all");
  const [viewMode, setViewMode] = useState<ViewMode>("cards");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videos, setVideos] = useState<VideoResult[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const savedKey = localStorage.getItem("youtubeApiKey") ?? "";
    if (savedKey.trim()) {
      setApiKey(savedKey);
      setHasStoredKey(true);
      return;
    }

    setApiKey(defaultApiKey);
    setHasStoredKey(true);
    localStorage.setItem("youtubeApiKey", defaultApiKey);
  }, []);

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      if (durationFilter === "short" && !video.isShortForm) {
        return false;
      }
      if (durationFilter === "long" && video.isShortForm) {
        return false;
      }
      if (ratioFilter !== "all") {
        return video.ratioLevel === ratioFilter;
      }
      return true;
    });
  }, [videos, durationFilter, ratioFilter]);

  const handleSaveApiKey = () => {
    const trimmedKey = apiKeyInput.trim();
    if (!trimmedKey) {
      setError("API 키를 입력해주세요.");
      return;
    }

    setApiKey(trimmedKey);
    setHasStoredKey(true);
    localStorage.setItem("youtubeApiKey", trimmedKey);
    setApiKeyInput("");
    setError(null);
  };

  const handleExportExcel = () => {
    if (!filteredVideos.length) {
      setError("엑셀로 저장할 검색 결과가 없습니다.");
      return;
    }

    const exportRows = filteredVideos.map((video) => ({
      제목: video.title,
      채널명: video.channelTitle,
      설명: video.description,
      태그: video.tags.join(", "),
      조회수: video.viewCount,
      구독자수: video.subscriberCount ?? undefined,
      조회수대비구독자비율: video.viewToSubscriberRatio ?? undefined,
      비율등급: video.ratioLevel ?? undefined,
      영상길이: video.durationFormatted,
      업로드일: formatDate(video.publishedAt),
      URL: buildVideoUrl(video.id),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "YouTube 검색결과");

    const timestamp = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(workbook, `youtube-search-${timestamp}.xlsx`);
  };

  const handleSearch = async () => {
    const trimmedTerm = searchTerm.trim();
    if (!apiKey) {
      setError("먼저 유튜브 API 키를 저장해주세요.");
      return;
    }

    if (!trimmedTerm) {
      setError("검색어를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const publishedAfter = getPublishedAfter(timeFilter);
      const searchParams = new URLSearchParams({
        key: apiKey,
        part: "snippet",
        q: trimmedTerm,
        type: "video",
        maxResults: "25",
        order: "date",
      });

      if (publishedAfter) {
        searchParams.append("publishedAfter", publishedAfter);
      }

      const searchResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?${searchParams.toString()}`
      );

      if (!searchResponse.ok) {
        throw new Error("검색 요청이 실패했습니다. API 키와 쿼터를 확인해주세요.");
      }

      const searchData = await searchResponse.json();
      const searchItems = Array.isArray(searchData.items)
        ? searchData.items
        : [];
      const videoIds = searchItems
        .map((item: any) => item.id?.videoId)
        .filter(Boolean);

      if (!videoIds.length) {
        setVideos([]);
        setLastUpdated(new Date());
        return;
      }

      const videosResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?${new URLSearchParams({
          key: apiKey,
          part: "snippet,contentDetails,statistics",
          id: videoIds.join(","),
        }).toString()}`
      );

      if (!videosResponse.ok) {
        throw new Error("영상 상세 정보를 불러오지 못했습니다.");
      }

      const videosData = await videosResponse.json();
      const videoItems = Array.isArray(videosData.items)
        ? videosData.items
        : [];
      const channelIds = Array.from(
        new Set(
          videoItems
            .map((item: any) => item.snippet?.channelId)
            .filter(Boolean)
        )
      );

      const channelMap: Record<
        string,
        { title: string; subscriberCount: number | null }
      > = {};

      if (channelIds.length) {
        const channelsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?${new URLSearchParams({
            key: apiKey,
            part: "snippet,statistics",
            id: channelIds.join(","),
          }).toString()}`
        );

        if (!channelsResponse.ok) {
          throw new Error("채널 정보를 불러오지 못했습니다.");
        }

        const channelsData = await channelsResponse.json();
        const channelItems = Array.isArray(channelsData.items)
          ? channelsData.items
          : [];
        channelItems.forEach((channel: any) => {
          const subscriberCount = channel.statistics?.hiddenSubscriberCount
            ? null
            : Number(channel.statistics?.subscriberCount ?? 0);
          channelMap[channel.id] = {
            title: channel.snippet?.title ?? "알 수 없는 채널",
            subscriberCount:
              subscriberCount && subscriberCount > 0 ? subscriberCount : null,
          };
        });
      }

      const compiledVideos: VideoResult[] = videoItems.map((item: any) => {
        const durationSeconds = isoDurationToSeconds(
          item.contentDetails?.duration ?? ""
        );
        const viewCount = Number(item.statistics?.viewCount ?? 0);
        const likeCount = item.statistics?.likeCount
          ? Number(item.statistics.likeCount)
          : null;
        const commentCount = item.statistics?.commentCount
          ? Number(item.statistics.commentCount)
          : null;
        const channelId = item.snippet?.channelId ?? "";
        const channelInfo = channelMap[channelId] ?? {
          title: item.snippet?.channelTitle ?? "알 수 없는 채널",
          subscriberCount: null,
        };
        const ratio =
          channelInfo.subscriberCount && channelInfo.subscriberCount > 0
            ? viewCount / channelInfo.subscriberCount
            : null;

        return {
          id: item.id,
          title: item.snippet?.title ?? "제목 없음",
          description: item.snippet?.description ?? "",
          tags: item.snippet?.tags ?? [],
          thumbnail:
            item.snippet?.thumbnails?.high?.url ??
            item.snippet?.thumbnails?.default?.url ??
            "",
          channelTitle: channelInfo.title,
          channelId,
          publishedAt: item.snippet?.publishedAt ?? "",
          durationSeconds,
          durationFormatted: formatDuration(durationSeconds),
          isShortForm: durationSeconds < 60,
          viewCount,
          likeCount,
          commentCount,
          subscriberCount: channelInfo.subscriberCount,
          viewToSubscriberRatio: ratio,
          ratioLevel: determineRatioLevel(ratio),
        };
      });

      setVideos(compiledVideos);
      setLastUpdated(new Date());
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "검색 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const value: YouTubeAnalyticsContextValue = {
    apiKey,
    apiKeyInput,
    hasStoredKey,
    setApiKeyInput,
    searchTerm,
    setSearchTerm,
    durationFilter,
    setDurationFilter,
    timeFilter,
    setTimeFilter,
    ratioFilter,
    setRatioFilter,
    viewMode,
    setViewMode,
    isLoading,
    error,
    setError,
    videos,
    filteredVideos,
    lastUpdated,
    handleSaveApiKey,
    handleSearch,
    handleExportExcel,
  };

  return (
    <YouTubeAnalyticsContext.Provider value={value}>
      {children}
    </YouTubeAnalyticsContext.Provider>
  );
}

export function useYouTubeAnalytics() {
  const context = useContext(YouTubeAnalyticsContext);
  if (!context) {
    throw new Error(
      "useYouTubeAnalytics 훅은 YouTubeAnalyticsProvider 내부에서만 사용할 수 있습니다."
    );
  }
  return context;
}

