import {
  collection,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  onSnapshot,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
// Import Firestore types for proper typing
import type { Firestore } from 'firebase/firestore';
import { SecurityGuard, GuardShift, ShiftSummary } from '../types';

export class GuardService {
  private static instance: GuardService;

  static getInstance(): GuardService {
    if (!GuardService.instance) {
      GuardService.instance = new GuardService();
    }
    return GuardService.instance;
  }

  private constructor() {}

  // Get all guards for an estate
  async getGuards(estateId: string): Promise<SecurityGuard[]> {
    if (!db) {
      return this.getMockGuards(estateId);
    }

    try {
      const guardsQuery = query(
        collection(db as Firestore, 'securityGuards'),
        where('estateId', '==', estateId),
        where('isActive', '==', true),
        orderBy('name', 'asc')
      );

      const querySnapshot = await getDocs(guardsQuery);
      const guards: SecurityGuard[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        guards.push({
          id: doc.id,
          ...data,
          hireDate: data.hireDate?.toDate() || new Date(),
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as SecurityGuard);
      });

      return guards;
    } catch (error) {
      console.error('Error fetching guards:', error);
      return this.getMockGuards(estateId);
    }
  }

  // Clock in a guard
  async clockIn(
    guardId: string,
    guardName: string,
    estateId: string,
    shiftType: 'day' | 'night' | 'morning' | 'evening' | 'overtime' | 'rotating' = 'day',
    location?: string,
    notes?: string
  ): Promise<string> {
    if (!db) {
      return this.mockClockIn(guardId, guardName, estateId, shiftType, location, notes);
    }

    try {
      const shiftData = {
        guardId,
        guardName,
        estateId,
        clockInTime: serverTimestamp(),
        shiftType,
        status: 'clocked_in',
        location: location || 'Main Gate',
        notes: notes || '',
        incidents: [],
        breaks: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const shiftRef = await addDoc(collection(db as Firestore, 'guardShifts'), shiftData);
      return shiftRef.id;
    } catch (error) {
      console.error('Error clocking in guard:', error);
      throw new Error('Failed to clock in. Please try again.');
    }
  }

  // Clock out a guard
  async clockOut(
    shiftId: string,
    notes?: string
  ): Promise<void> {
    if (!db) {
      return this.mockClockOut(shiftId, notes);
    }

    try {
      const shiftRef = doc(db as Firestore, 'guardShifts', shiftId);
      await updateDoc(shiftRef, {
        clockOutTime: serverTimestamp(),
        status: 'clocked_out',
        notes: notes || '',
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error clocking out guard:', error);
      throw new Error('Failed to clock out. Please try again.');
    }
  }

  // Get current active shifts for an estate
  async getActiveShifts(estateId: string): Promise<GuardShift[]> {
    if (!db) {
      return this.getMockActiveShifts(estateId);
    }

    try {
      const shiftsQuery = query(
        collection(db as Firestore, 'guardShifts'),
        where('estateId', '==', estateId),
        where('status', '==', 'clocked_in'),
        orderBy('clockInTime', 'desc')
      );

      const querySnapshot = await getDocs(shiftsQuery);
      const shifts: GuardShift[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        shifts.push({
          id: doc.id,
          ...data,
          clockInTime: data.clockInTime?.toDate() || new Date(),
          clockOutTime: data.clockOutTime?.toDate(),
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as GuardShift);
      });

      return shifts;
    } catch (error) {
      console.error('Error fetching active shifts:', error);
      return this.getMockActiveShifts(estateId);
    }
  }

  // Get guard shift history
  async getGuardShiftHistory(
    guardId: string,
    estateId: string,
    limitCount: number = 10
  ): Promise<GuardShift[]> {
    if (!db) {
      return this.getMockShiftHistory(guardId, estateId, limitCount);
    }

    try {
      const shiftsQuery = query(
        collection(db as Firestore, 'guardShifts'),
        where('guardId', '==', guardId),
        where('estateId', '==', estateId),
        orderBy('clockInTime', 'desc'),
        limit(limitCount)
      );

      const querySnapshot = await getDocs(shiftsQuery);
      const shifts: GuardShift[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        shifts.push({
          id: doc.id,
          ...data,
          clockInTime: data.clockInTime?.toDate() || new Date(),
          clockOutTime: data.clockOutTime?.toDate(),
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as GuardShift);
      });

      return shifts;
    } catch (error) {
      console.error('Error fetching shift history:', error);
      return this.getMockShiftHistory(guardId, estateId, limitCount);
    }
  }

  // Subscribe to active shifts updates
  subscribeToActiveShifts(
    estateId: string,
    callback: (shifts: GuardShift[]) => void
  ): () => void {
    if (!db) {
      // Return mock data and a dummy unsubscribe function
      callback(this.getMockActiveShifts(estateId));
      return () => {};
    }

    try {
      const shiftsQuery = query(
        collection(db as Firestore, 'guardShifts'),
        where('estateId', '==', estateId),
        where('status', '==', 'clocked_in'),
        orderBy('clockInTime', 'desc')
      );

      const unsubscribe = onSnapshot(shiftsQuery, (querySnapshot) => {
        const shifts: GuardShift[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          shifts.push({
            id: doc.id,
            ...data,
            clockInTime: data.clockInTime?.toDate() || new Date(),
            clockOutTime: data.clockOutTime?.toDate(),
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          } as GuardShift);
        });
        callback(shifts);
      });

      return unsubscribe;
    } catch (error) {
      console.error('Error subscribing to active shifts:', error);
      callback(this.getMockActiveShifts(estateId));
      return () => {};
    }
  }

  // Get guard by ID
  async getGuardById(guardId: string): Promise<SecurityGuard | null> {
    const mockGuards = this.getMockGuards('estate-demo-001');
    return mockGuards.find(guard => guard.id === guardId) || null;
  }

  // Check if guard is currently clocked in
  async isGuardClockedIn(guardId: string, estateId: string): Promise<GuardShift | null> {
    if (!db) {
      const activeShifts = this.getMockActiveShifts(estateId);
      return activeShifts.find(shift => shift.guardId === guardId) || null;
    }

    try {
      const shiftsQuery = query(
        collection(db as Firestore, 'guardShifts'),
        where('guardId', '==', guardId),
        where('estateId', '==', estateId),
        where('status', '==', 'clocked_in'),
        limit(1)
      );

      const querySnapshot = await getDocs(shiftsQuery);
      if (querySnapshot.empty) {
        return null;
      }

      const doc = querySnapshot.docs[0];
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        clockInTime: data.clockInTime?.toDate() || new Date(),
        clockOutTime: data.clockOutTime?.toDate(),
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as GuardShift;
    } catch (error) {
      console.error('Error checking guard clock-in status:', error);
      return null;
    }
  }

  // Mock data for development
  private getMockGuards(estateId: string): SecurityGuard[] {
    return [
      {
        id: 'guard-001',
        name: 'John Mthembu',
        email: 'john.mthembu@serenresidential.com',
        phone: '+27 82 123 4567',
        badgeNumber: 'SG001',
        estateId,
        role: 'head_security',
        shift: 'day',
        status: 'active',
        hireDate: new Date('2023-01-15'),
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        emergencyContact: {
          name: 'Mary Mthembu',
          phone: '+27 82 987 6543',
          relationship: 'Spouse'
        },
        isActive: true,
        createdAt: new Date('2023-01-15'),
        updatedAt: new Date()
      },
      {
        id: 'guard-002',
        name: 'Sarah Ndlovu',
        email: 'sarah.ndlovu@serenresidential.com',
        phone: '+27 83 456 7890',
        badgeNumber: 'SG002',
        estateId,
        role: 'security_guard',
        shift: 'night',
        status: 'active',
        hireDate: new Date('2023-02-20'),
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        emergencyContact: {
          name: 'Peter Ndlovu',
          phone: '+27 84 123 4567',
          relationship: 'Brother'
        },
        isActive: true,
        createdAt: new Date('2023-02-20'),
        updatedAt: new Date()
      },
      {
        id: 'guard-003',
        name: 'Michael Sithole',
        email: 'michael.sithole@serenresidential.com',
        phone: '+27 85 789 0123',
        badgeNumber: 'SG003',
        estateId,
        role: 'patrol_officer',
        shift: 'rotating',
        status: 'active',
        hireDate: new Date('2023-03-10'),
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        emergencyContact: {
          name: 'Grace Sithole',
          phone: '+27 86 456 7890',
          relationship: 'Mother'
        },
        isActive: true,
        createdAt: new Date('2023-03-10'),
        updatedAt: new Date()
      },
      {
        id: 'guard-004',
        name: 'David Mokoena',
        email: 'david.mokoena@serenresidential.com',
        phone: '+27 87 234 5678',
        badgeNumber: 'SG004',
        estateId,
        role: 'security_guard',
        shift: 'evening',
        status: 'active',
        hireDate: new Date('2023-04-05'),
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        emergencyContact: {
          name: 'Nomsa Mokoena',
          phone: '+27 88 567 8901',
          relationship: 'Sister'
        },
        isActive: true,
        createdAt: new Date('2023-04-05'),
        updatedAt: new Date()
      }
    ];
  }

  private getMockActiveShifts(estateId: string): GuardShift[] {
    return [
      {
        id: 'shift-001',
        guardId: 'guard-001',
        guardName: 'John Mthembu',
        estateId,
        clockInTime: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        shiftType: 'day',
        status: 'clocked_in',
        location: 'Main Gate',
        notes: 'Starting day shift',
        incidents: [],
        breaks: [],
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
        updatedAt: new Date()
      },
      {
        id: 'shift-002',
        guardId: 'guard-003',
        guardName: 'Michael Sithole',
        estateId,
        clockInTime: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
        shiftType: 'day',
        status: 'clocked_in',
        location: 'Patrol Route A',
        notes: 'Patrol duty',
        incidents: [],
        breaks: [],
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        updatedAt: new Date()
      }
    ];
  }

  private getMockShiftHistory(guardId: string, estateId: string, limitCount: number): GuardShift[] {
    return [
      {
        id: 'shift-history-001',
        guardId,
        guardName: 'John Mthembu',
        estateId,
        clockInTime: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
        clockOutTime: new Date(Date.now() - 16 * 60 * 60 * 1000), // 16 hours ago
        shiftType: 'day' as const,
        status: 'clocked_out' as const,
        location: 'Main Gate',
        notes: 'Regular shift completed',
        duration: 480, // 8 hours
        incidents: [],
        breaks: [
          {
            startTime: new Date(Date.now() - 20 * 60 * 60 * 1000),
            endTime: new Date(Date.now() - 19 * 60 * 60 * 1000),
            type: 'lunch' as const,
            duration: 60
          }
        ],
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 16 * 60 * 60 * 1000)
      }
    ].slice(0, limitCount);
  }

  private mockClockIn(
    guardId: string,
    guardName: string,
    estateId: string,
    shiftType: 'day' | 'night' | 'morning' | 'evening' | 'overtime' | 'rotating',
    location?: string,
    notes?: string
  ): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const shiftId = `shift-${Date.now()}`;
        console.log(`Mock: Guard ${guardName} clocked in with shift ID: ${shiftId}`);
        resolve(shiftId);
      }, 500);
    });
  }

  private mockClockOut(shiftId: string, notes?: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Mock: Shift ${shiftId} clocked out with notes: ${notes || 'No notes'}`);
        resolve();
      }, 500);
    });
  }
}
