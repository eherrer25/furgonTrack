import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuConductorPage } from './menu-conductor.page';

describe('MenuConductorPage', () => {
  let component: MenuConductorPage;
  let fixture: ComponentFixture<MenuConductorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuConductorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuConductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
