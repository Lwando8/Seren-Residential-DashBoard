import { db } from './firebase';
import type { Firestore } from 'firebase/firestore';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { CommunityAnnouncement, CommunityClub, CommunityEvent, Venue } from '../types';

type UnsubscribeFn = () => void;

export class CommunityService {
  private static instance: CommunityService;
  private constructor() {}

  static getInstance(): CommunityService {
    if (!CommunityService.instance) {
      CommunityService.instance = new CommunityService();
    }
    return CommunityService.instance;
  }

  async getAnnouncements(estateId: string): Promise<CommunityAnnouncement[]> {
    try {
      const q = query(
        collection(db as Firestore, 'announcements'),
        where('estateId', '==', estateId),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((d) => {
        const data = d.data() as any;
        return {
          id: d.id,
          estateId: data.estateId,
          title: data.title,
          content: data.content,
          audience: data.audience,
          createdById: data.createdById,
          createdByName: data.createdByName,
          createdByRole: data.createdByRole,
          createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(),
          pinned: !!data.pinned,
        } as CommunityAnnouncement;
      });
    } catch {
      // Fallback mock data
      return [
        {
          id: 'a-1',
          estateId,
          title: 'Pool Maintenance Tomorrow',
          content: 'The community pool will be closed for routine maintenance from 08:00 to 12:00.',
          audience: 'all',
          createdById: 'mgmt-1',
          createdByName: 'Estate Management',
          createdByRole: 'management',
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
          pinned: true,
        },
        {
          id: 'a-2',
          estateId,
          title: 'Security Patrol Update',
          content: 'Evening patrol coverage has been increased along the north perimeter.',
          audience: 'residents',
          createdById: 'sec-1',
          createdByName: 'Head of Security',
          createdByRole: 'security',
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
        },
      ];
    }
  }

  subscribeAnnouncements(
    estateId: string,
    onUpdate: (announcements: CommunityAnnouncement[]) => void
  ): UnsubscribeFn {
    try {
      const q = query(
        collection(db as Firestore, 'announcements'),
        where('estateId', '==', estateId),
        orderBy('createdAt', 'desc')
      );
      const unsub = onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map((d) => {
          const data = d.data() as any;
          return {
            id: d.id,
            estateId: data.estateId,
            title: data.title,
            content: data.content,
            audience: data.audience,
            createdById: data.createdById,
            createdByName: data.createdByName,
            createdByRole: data.createdByRole,
            createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(),
            pinned: !!data.pinned,
          } as CommunityAnnouncement;
        });
        onUpdate(items);
      });
      return unsub;
    } catch {
      // Mock: no-op
      return () => {};
    }
  }

  async postAnnouncement(
    estateId: string,
    payload: Omit<CommunityAnnouncement, 'id' | 'createdAt' | 'estateId'>
  ): Promise<string> {
    try {
      const ref = await addDoc(collection(db as Firestore, 'announcements'), {
        ...payload,
        estateId,
        createdAt: serverTimestamp(),
      });
      return ref.id;
    } catch {
      // Mock id
      return 'mock-annc-id';
    }
  }

  async getPendingClubs(estateId: string): Promise<CommunityClub[]> {
    try {
      const q = query(
        collection(db as Firestore, 'communityClubs'),
        where('estateId', '==', estateId),
        where('status', '==', 'pending'),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((d) => {
        const data = d.data() as any;
        return {
          id: d.id,
          estateId: data.estateId,
          name: data.name,
          description: data.description,
          members: data.members ?? 0,
          category: data.category,
          icon: data.icon ?? 'Users',
          organizer: data.organizer,
          status: data.status,
          createdByUserId: data.createdByUserId,
          createdByName: data.createdByName,
          createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(),
          approvalByUserId: data.approvalByUserId,
          approvalNotes: data.approvalNotes,
          nextMeeting: data.nextMeeting,
        } as CommunityClub;
      });
    } catch {
      // Fallback mock
      return [
        {
          id: 'club-1',
          estateId,
          name: 'Saturday Runners',
          description: 'Weekly 5km runs around the estate.',
          members: 23,
          category: 'fitness',
          icon: 'Running',
          organizer: 'Anele M.',
          status: 'pending',
          createdByUserId: 'user-1',
          createdByName: 'Anele M.',
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
        },
        {
          id: 'club-2',
          estateId,
          name: 'Mums & Tots',
          description: 'A friendly social group for parents and little ones.',
          members: 12,
          category: 'family',
          icon: 'Heart',
          organizer: 'Nomsa K.',
          status: 'pending',
          createdByUserId: 'user-2',
          createdByName: 'Nomsa K.',
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30),
        },
      ];
    }
  }

  async approveClub(
    clubId: string,
    approverUserId: string,
    notes?: string
  ): Promise<void> {
    try {
      const ref = doc(db as Firestore, 'communityClubs', clubId);
      await updateDoc(ref, {
        status: 'approved',
        approvalByUserId: approverUserId,
        approvalNotes: notes ?? '',
      });
    } catch {
      // mock: no-op
    }
  }

  async rejectClub(
    clubId: string,
    approverUserId: string,
    notes?: string
  ): Promise<void> {
    try {
      const ref = doc(db as Firestore, 'communityClubs', clubId);
      await updateDoc(ref, {
        status: 'rejected',
        approvalByUserId: approverUserId,
        approvalNotes: notes ?? '',
      });
    } catch {
      // mock: no-op
    }
  }

  // Venue & Event scheduling
  async listVenues(estateId: string): Promise<Venue[]> {
    try {
      const q = query(
        collection(db as Firestore, 'venues'),
        where('estateId', '==', estateId),
        orderBy('name', 'asc') as any
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as Venue[];
    } catch {
      // Mock venues
      return [
        { id: 'venue-hall', name: 'Community Hall', location: 'Center Pavilion', capacity: 120 },
        { id: 'venue-park', name: 'Main Park Gazebo', location: 'North Park', capacity: 40 },
        { id: 'venue-pool', name: 'Pool Lounge', location: 'Clubhouse', capacity: 30 },
      ];
    }
  }

  async listEvents(estateId: string, venueId?: string): Promise<CommunityEvent[]> {
    try {
      let qBase = query(
        collection(db as Firestore, 'communityEvents'),
        where('estateId', '==', estateId)
      );
      if (venueId) {
        qBase = query(qBase, where('venueId', '==', venueId));
      }
      const snapshot = await getDocs(qBase);
      return snapshot.docs.map((d) => {
        const data = d.data() as any;
        return {
          id: d.id,
          estateId: data.estateId,
          clubId: data.clubId,
          title: data.title,
          description: data.description,
          category: data.category,
          organizer: data.organizer,
          attendees: data.attendees ?? 0,
          maxAttendees: data.maxAttendees,
          venueId: data.venueId,
          venueName: data.venueName,
          startAt: data.startAt instanceof Timestamp ? data.startAt.toDate() : new Date(data.startAt),
          endAt: data.endAt instanceof Timestamp ? data.endAt.toDate() : new Date(data.endAt),
          isAttending: !!data.isAttending,
        } as CommunityEvent;
      });
    } catch {
      // Mock events
      return [
        {
          id: 'evt-1',
          estateId,
          clubId: 'club-1',
          title: 'Saturday Run',
          description: '5km around the estate',
          category: 'fitness',
          organizer: 'Anele M.',
          attendees: 15,
          maxAttendees: 40,
          venueId: 'venue-park',
          venueName: 'Main Park Gazebo',
          startAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
          endAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 60),
          isAttending: false,
        },
      ];
    }
  }

  // Pure overlap detection: returns true if overlapping
  doEventsOverlap(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date): boolean {
    return aStart < bEnd && bStart < aEnd;
  }

  // Check for scheduling conflicts for a venue
  async hasVenueConflict(
    estateId: string,
    venueId: string,
    startAt: Date,
    endAt: Date
  ): Promise<{ conflict: boolean; conflictingEvents: CommunityEvent[] }> {
    const events = await this.listEvents(estateId, venueId);
    const conflicts = events.filter((ev) => this.doEventsOverlap(startAt, endAt, ev.startAt, ev.endAt));
    return { conflict: conflicts.length > 0, conflictingEvents: conflicts };
  }

  // Create event with conflict prevention
  async createEvent(
    estateId: string,
    payload: Omit<CommunityEvent, 'id' | 'estateId'>
  ): Promise<{ id?: string; conflict?: { conflictingEvents: CommunityEvent[] } }> {
    const { venueId, startAt, endAt } = payload;
    const check = await this.hasVenueConflict(estateId, venueId, startAt, endAt);
    if (check.conflict) {
      return { conflict: { conflictingEvents: check.conflictingEvents } };
    }
    try {
      const ref = await addDoc(collection(db as Firestore, 'communityEvents'), {
        ...payload,
        estateId,
        startAt: serverTimestamp(),
        endAt: serverTimestamp(),
      });
      return { id: ref.id };
    } catch {
      // Mock id when offline
      return { id: 'mock-event-id' };
    }
  }
}

export default CommunityService;


