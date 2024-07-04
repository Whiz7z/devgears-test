
import { BehaviorSubject } from "rxjs";
import { User } from "../types/types";

const loadInitialState = (): User | null => {
  console.log(localStorage.getItem("userrr"));
  const savedUser = localStorage.getItem("user");
  return savedUser ? JSON.parse(savedUser) : null;
};

const initialUserState: User | null  = loadInitialState();

const userSubject = new BehaviorSubject<User | null>(initialUserState);

export const user$ = userSubject.asObservable();

export const setUser = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
  userSubject.next(user);
};

export const clearUser = () => {
  localStorage.removeItem("user");
  userSubject.next(null);
};

export const updateUser = (updatedUser: Partial<User>) => {
  const currentUser = userSubject.getValue();
  if (currentUser) {
    const newUser = { ...currentUser, ...updatedUser };
    localStorage.setItem("user", JSON.stringify(newUser));
    userSubject.next(newUser);
  }
};
